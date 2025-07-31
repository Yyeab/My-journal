require 'rails_helper'

describe 'Journals API', type: :request do
  let!(:user) { User.create!(email: 'journal@example.com', username: 'journaluser', password: 'password123', password_confirmation: 'password123') }
  let!(:token) { JwtHelper.encode(user_id: user.id) }
  let!(:headers) { { 'Authorization' => "Bearer #{token}" } }

  it 'creates a journal' do
    post '/journals', params: { journal: { title: 'My Day', content: 'It was great!' } }, headers: headers
    expect(response).to have_http_status(:created)
    expect(JSON.parse(response.body)['title']).to eq('My Day')
  end

  it 'lists journals' do
    user.journals.create!(title: 'First', content: 'Entry')
    get '/journals', headers: headers
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body).length).to be >= 1
  end

  it 'shows a journal' do
    journal = user.journals.create!(title: 'Show', content: 'This one')
    get "/journals/#{journal.id}", headers: headers
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)['title']).to eq('Show')
  end

  it 'updates a journal' do
    journal = user.journals.create!(title: 'Old', content: 'Old content')
    patch "/journals/#{journal.id}", params: { journal: { content: 'New content' } }, headers: headers
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)['content']).to eq('New content')
  end

  it 'deletes a journal' do
    journal = user.journals.create!(title: 'Delete', content: 'To be deleted')
    delete "/journals/#{journal.id}", headers: headers
    expect(response).to have_http_status(:no_content)
    expect(Journal.find_by(id: journal.id)).to be_nil
  end

  it 'rejects unauthorized access' do
    get '/journals'
    expect(response).to have_http_status(:unauthorized)
  end
end
