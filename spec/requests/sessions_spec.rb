require 'rails_helper'

describe 'User Login', type: :request do
  let!(:user) { User.create!(email: 'login@example.com', username: 'loginuser', password: 'password123', password_confirmation: 'password123') }

  it 'logs in with valid credentials and returns a JWT' do
    post '/login', params: { email: 'login@example.com', password: 'password123' }
    expect(response).to have_http_status(:ok)
    json = JSON.parse(response.body)
    expect(json['token']).to be_present
    expect(json['user']['email']).to eq('login@example.com')
  end

  it 'fails with invalid credentials' do
    post '/login', params: { email: 'login@example.com', password: 'wrongpass' }
    expect(response).to have_http_status(:unauthorized)
    expect(JSON.parse(response.body)['error']).to eq('Invalid email or password')
  end
end
