# Edutaktika (Educational Demo)

An educational project demonstrating a gamified learning interface plus a design editor (Polotno-based) with Firebase authentication / database examples.

## Educational Disclaimer
See `DISCLAIMER.md`. Not affiliated with any original brand. Non‑commercial use only.

## Firebase
The site uses Firebase Auth and Realtime Database for demonstration:
- Auth: basic role redirect (teacher vs student)
- Database: store or lookup simple user role records

### Do Not Store Sensitive Data
This is not production security hardened. Use test emails only.

### Suggested Realtime Database Rules (Minimum Demo Safety)
```
{
  "rules": {
    "teachers": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "students": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "publicContent": { ".read": true, ".write": false }
  }
}
```
Adjust according to what collections you actually use.

## Local Development
No build step needed for static pages. For the editor (inside `Editor/`):
```
cd Editor
npm install
npm run dev
```

## Deployment (Quick Notes)
- GitHub Pages: build `Editor` then deploy `dist` + static pages.
- Netlify: set base = `Editor`, command = `npm run build`, publish = `Editor/dist`.

## License
Educational use only. Check third‑party component licenses (Polotno SDK, etc.).
