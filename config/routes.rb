Rails.application.routes.draw do
  resources :users, only: [ :create ]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"

  resources :journals do
    resources :tags, only: [ :index, :create, :destroy ]
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
