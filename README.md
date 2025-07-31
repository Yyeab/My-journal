# My-Journal Rails Backend

This is the backend API for the My-Journal application, built with Ruby on Rails.

## Setup Instructions

**Install dependencies:**
   ```sh
   bundle install
   ```

**Set up the database:**
   ```sh
   bin/rails db:create db:migrate
   bin/rails db:create db:migrate RAILS_ENV=test (For testing)
   
   ```


## API Endpoints

- `POST /signup` — Register a new user
- `POST /login` — Log in and receive a JWT token
- `GET /journals` — List journals (requires JWT)
- `POST /journals` — Create a journal (requires JWT)
- `GET /journals/:id` — Show a journal (requires JWT)
- `PATCH/PUT /journals/:id` — Update a journal (requires JWT)
- `DELETE /journals/:id` — Delete a journal (requires JWT)
- `GET /journals/:journal_id/tags` — List tags for a journal (requires JWT)
- `POST /journals/:journal_id/tags` — Add a tag to a journal (requires JWT)
- `DELETE /journals/:journal_id/tags/:id` — Remove a tag from a journal (requires JWT)


```

## Running Tests

RSpec is used for testing. To run all request specs:

```
bin/rspec spec/requests
```

You can also run individual test files, for example:

```
bin/rspec spec/requests/users_spec.rb
bin/rspec spec/requests/journals_spec.rb
bin/rspec spec/requests/tags_spec.rb
```
