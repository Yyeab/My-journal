require 'rails_helper'

describe 'Tags API', type: :request do
  let!(:user) { User.create!(email: 'tag@example.com', username: 'taguser', password: 'password123', password_confirmation: 'password123') }
  let!(:token) { JwtHelper.encode(user_id: user.id) }
  let!(:headers) { { 'Authorization' => "Bearer #{token}" } }
  let!(:journal) { user.journals.create!(title: 'Journal with Tags', content: 'Content') }

  it 'creates a tag for a journal' do
    post "/journals/#{journal.id}/tags", params: { tag: { tag_name: 'happy' } }, headers: headers
    expect(response).to have_http_status(:created)
    expect(JSON.parse(response.body)['tag_name']).to eq('happy')
  end

  it 'lists tags for a journal' do
    journal.tags.create!(tag_name: 'life')
    get "/journals/#{journal.id}/tags", headers: headers
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body).map { |t| t['tag_name'] }).to include('life')
  end

  it 'deletes a tag from a journal' do
    tag = journal.tags.create!(tag_name: 'delete-me')
    delete "/journals/#{journal.id}/tags/#{tag.id}", headers: headers
    expect(response).to have_http_status(:no_content)
    expect(journal.tags.find_by(id: tag.id)).to be_nil
  end

  it 'rejects unauthorized access' do
    get "/journals/#{journal.id}/tags"
    expect(response).to have_http_status(:unauthorized)
  end
end
