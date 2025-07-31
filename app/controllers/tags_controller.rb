class TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_journal
  before_action :set_tag, only: [ :destroy ]

  def index
    render json: @journal.tags
  end

  def create
    tag = @journal.tags.build(tag_params)
    if tag.save
      render json: tag, status: :created
    else
      render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @tag.destroy
    head :no_content
  end

  private

  def set_journal
    @journal = current_user.journals.find(params[:journal_id])
  end

  def set_tag
    @tag = @journal.tags.find(params[:id])
  end

  def tag_params
    params.require(:tag).permit(:tag_name)
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
