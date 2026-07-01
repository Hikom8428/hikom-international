<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #0F2942;
    color: #e6edf3;
    min-height: 100vh;
  }
  .wrap { max-width: 780px; margin: 0 auto; padding: 48px 20px; }
  .card { background: #13304d; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; margin-bottom: 24px; }
  h1 { font-size: 1.5rem; margin: 0; color: #fff; }
  h2 { font-size: 1.1rem; color: #fff; margin: 0 0 16px; }
  label { display: block; font-size: 0.8rem; margin: 16px 0 6px; color: #9fb3c8; text-transform: uppercase; letter-spacing: 0.05em; }
  input[type=text], input[type=password], textarea {
    width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15);
    background: #0a1c2e; color: #fff; font-size: 0.95rem; font-family: inherit;
  }
  textarea { min-height: 80px; resize: vertical; }
  button, .btn {
    display: inline-block; margin-top: 20px; padding: 10px 22px; border-radius: 8px; border: none;
    background: #00B4D8; color: #0F2942; font-weight: 700; cursor: pointer; text-decoration: none; font-size: 0.9rem;
  }
  button.secondary, .btn.secondary { background: transparent; color: #00B4D8; border: 1px solid #00B4D8; }
  button.danger, .btn.danger { background: transparent; color: #ff8080; border: 1px solid rgba(255,128,128,0.5); }
  .error { background: rgba(255,80,80,0.15); border: 1px solid rgba(255,80,80,0.4); color: #ffb3b3; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; }
  .success { background: rgba(0,180,216,0.15); border: 1px solid rgba(0,180,216,0.4); color: #7fe0f5; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 0.85rem; vertical-align: top; }
  th { color: #9fb3c8; text-transform: uppercase; font-size: 0.7rem; }
  a { color: #00B4D8; }
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .hint { color: #9fb3c8; font-size: 0.8rem; margin-top: 6px; line-height: 1.4; }
  .quick-keys { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .quick-keys button { margin-top: 0; padding: 6px 14px; font-size: 0.8rem; }
  .actions-cell { white-space: nowrap; }
  .actions-cell form { display: inline; }
</style>
