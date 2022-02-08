## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

#### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### you can go to /login path (localhost:3000/login) to see authentication page.
#### this project used MongoDB for database.
##### Create database name "smf" and you should to add collections consisted of
- ##### `posts`
  - _id
  - username
  - title
  - place
  - timeStart
  - timeEnd
  - gender
  - grade
  - num
  - join
  - img
- ##### `users`
  - _id
  - createedProfile
  - email
  - name
  - age
  - gender
  - picture
  - grade
  - faculty
  - major
