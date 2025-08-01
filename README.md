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

---

# My-Journal React Frontend

This is the frontend for the My-Journal application, built with React and Vite.

## Setup Instructions

**Install dependencies:**
   ```sh
   cd my-journal-react
   npm install
   ```

**Start the development server:**
   ```sh
   npm run dev
   ```


## Features

- User authentication (sign up, sign in, logout)
- Create, view, edit, and delete journal entries
- Add and remove tags (moods) for each journal
- Search and sort journals
- Download journal entries as PDF
- Responsive design for desktop and mobile
- JWT-based session management



## Project Structure

- `src/components/` — React components for authentication, journal management, overlays, and modals
- `src/App.jsx` — Main app and routing logic
- `public/` — Static assets and SVG icons

## Connecting to Backend

The frontend expects the Rails backend to be running at `http://localhost:3000`. Make sure CORS is enabled in the backend for `http://localhost:5173`.



---

