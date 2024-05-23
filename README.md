*Disclaimer: This code repo is older version of the current production build of this application and dosen't contain all the updated changes and has a lot of bugs. Since it is not possible to share the current repository as a whole. The link for the live tool is: https://www.supaclip.pro*

# Vid-B-Web (Now Supaclip.pro)
This is a product for creators to instantly create a landing page for their videos. And it also provides a custom chat support for your videos which answers users questions in real time. 

Watch the live demo here:
<a href="http://www.youtube.com/watch?feature=player_embedded&v=fBqrn4nXFlc" target="_blank">
 <img src="http://img.youtube.com/vi/fBqrn4nXFlc/mqdefault.jpg" alt="Watch the video" width="440" height="380" border="10" />
</a>


## TODOS
- [x] Initialize project (w/ t3-stack)
- [x] Upload to github (w/ github)
- [x] Deploy to vercel (w/ vercel)
- [ ] Builing Mockup UI
  - [ ] Create Landing Page
  - [ ] Creator Page (for users to see all creator videos)
  - [ ] Video Landing Page (for users to see a specific video)
  - [ ] Make the page editable (for creators to edit the video transcript and resources)
- [ ] Initialize database
- [ ] Add authentication (w/ next-auth)
- [ ] Chatbot functionality


## Getting Started (DEV)
if you don't have pnpm installed, run `npm install -g pnpm`

1. Clone the repo
2. Run `pnpm install`
3. Create a `.env` file in the root directory and add the following variables:
```
DATABASE_URL=<your database url>
NEXT_AUTH_URL=<your secret>
```
4. Run `pnpm start`
5. Open `http://localhost:3000` in your browser


