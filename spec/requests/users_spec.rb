require 'rails_helper'

describe 'User Registration', type: :request do
  it 'registers a new user with valid data' do
    post '/signup', params: {
      user: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        password_confirmation: 'password123'
      }
    }
    expect(response).to have_http_status(:created)
    expect(JSON.parse(response.body)['user']['email']).to eq('test@example.com')
  end

  it 'returns errors for invalid registration' do
    post '/signup', params: { user: { email: '', username: '', password: 'short' } }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)['errors']).to be_present
  end
end
