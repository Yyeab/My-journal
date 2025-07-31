class JournalsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_journal, only: [ :show, :update, :destroy ]

  def index
    journals = current_user.journals.includes(:tags)
    render json: journals.as_json(include: :tags)
  end

  def show
    render json: @journal.as_json(include: :tags)
  end

  def create
    journal = current_user.journals.build(journal_params)
    if journal.save
      render json: journal, status: :created
    else
      render json: { errors: journal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @journal.update(journal_params)
      render json: @journal
    else
      render json: { errors: @journal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @journal.destroy
    head :no_content
  end

  private

  def set_journal
    @journal = current_user.journals.find(params[:id])
  end

  def journal_params
    params.require(:journal).permit(:title, :content)
  end

  def authenticate_user!
    header = request.headers["Authorization"]
    token = header.split(" ").last if header
    decoded = JwtHelper.decode(token)
    @current_user = User.find_by(id: decoded["user_id"]) if decoded
    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end
end
