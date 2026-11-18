// Kape-ling Cafe - simple visual interactions for the website.

document.addEventListener("DOMContentLoaded", function () {
  addLoadingScreen();
  setupPageTransitions();
  setupAccountModal();
  showCommunityExamples();
});

// Keep the loading animation centered in the visitor's screen.
function addLoadingScreen() {
  const screen = document.createElement("div");
  screen.className = "loading-screen";
  screen.innerHTML = `
    <div class="loading-content">
      <div class="coffee-animation" aria-hidden="true">
        <span class="steam steam-one"></span>
        <span class="steam steam-two"></span>
        <span class="steam steam-three"></span>
        <div class="coffee-cup"><span></span></div>
        <div class="cup-saucer"></div>
      </div>
      <p class="loading-brand">Kape-ling Cafe</p>
      <p class="loading-message">Brewing something good</p>
    </div>`;
  document.body.prepend(screen);

  function hideScreen() {
    setTimeout(function () {
      screen.classList.add("loading-done");
      setTimeout(function () { screen.remove(); }, 500);
    }, 1200);
  }

  if (document.readyState === "complete") hideScreen();
  else window.addEventListener("load", hideScreen, { once: true });
}

// Add a soft fade when moving between pages.
function setupPageTransitions() {
  document.body.classList.add("page-enter");
  requestAnimationFrame(function () {
    document.body.classList.add("page-ready");
  });

  document.querySelectorAll('a[href]').forEach(function (link) {
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || link.target || link.hasAttribute("download")) return;

    link.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      document.body.classList.remove("page-ready");
      document.body.classList.add("page-leave");
      setTimeout(function () { window.location.href = url.href; }, 220);
    });
  });
}

// This login window is a design preview. It does not connect to an account system.
function setupAccountModal() {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;

  const openButton = document.createElement("button");
  openButton.type = "button";
  openButton.className = "account-nav-button";
  openButton.textContent = "Log in";
  nav.appendChild(openButton);

  const modal = document.createElement("div");
  modal.className = "account-modal";
  modal.innerHTML = `
    <div class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <button class="modal-close" type="button" aria-label="Close">×</button>
      <p class="eyebrow">WELCOME TO THE TAMBAYAN</p>
      <h2 id="account-title">Good to have you <em>here.</em></h2>
      <div class="account-tabs">
        <button type="button" class="account-tab active" data-mode="login">Log in</button>
        <button type="button" class="account-tab" data-mode="signup">Sign up</button>
      </div>
      <form class="account-form">
        <label class="signup-only" hidden>Full name
          <input type="text" placeholder="e.g. Juan Dela Cruz">
        </label>
        <label>Email address
          <input type="email" placeholder="you@example.com">
        </label>
        <label>Password
          <input type="password" placeholder="Enter your password">
        </label>
        <label class="signup-only" hidden>Confirm password
          <input type="password" placeholder="Enter your password again">
        </label>
        <button class="button account-submit" type="submit">Log in</button>
      </form>
      <p class="account-message" aria-live="polite"></p>
      <p class="account-note">Website design preview only. Account sign-in and registration are not connected.</p>
    </div>`;
  document.body.appendChild(modal);

  function closeModal() {
    modal.classList.remove("modal-visible");
    document.body.classList.remove("modal-open");
  }

  function setMode(mode) {
    modal.dataset.mode = mode;
    modal.querySelectorAll(".account-tab").forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.mode === mode);
    });
    modal.querySelectorAll(".signup-only").forEach(function (field) {
      field.hidden = mode !== "signup";
    });
    modal.querySelector("#account-title").innerHTML = mode === "signup"
      ? "Make yourself <em>at home.</em>"
      : "Good to have you <em>here.</em>";
    modal.querySelector(".account-submit").textContent = mode === "signup" ? "Create account" : "Log in";
    modal.querySelector(".account-message").textContent = "";
  }

  openButton.addEventListener("click", function () {
    modal.classList.add("modal-visible");
    document.body.classList.add("modal-open");
    setMode("login");
  });

  const communityLogin = document.querySelector("#community-login");
  if (communityLogin) communityLogin.addEventListener("click", function () { openButton.click(); });

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });
  modal.querySelectorAll(".account-tab").forEach(function (tab) {
    tab.addEventListener("click", function () { setMode(tab.dataset.mode); });
  });
  modal.querySelector(".account-form").addEventListener("submit", function (event) {
    event.preventDefault();
    modal.querySelector(".account-message").textContent = "This is a visual preview. Sign-in is not connected.";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
}

// Display sample posts and comments inside the Tambayan panel.
function showCommunityExamples() {
  const feed = document.querySelector(".community-feed");
  if (!feed) return;

  const posts = [
    {
      name: "Mika Santos",
      date: "Today · 10:24 AM",
      content: "Finally finished our group project! A Spanish latte is definitely deserved after that.",
      likes: 12,
      comments: [["Paolo Reyes", "Congrats! You earned that coffee."], ["Ana Cruz", "Same here. Deadlines are no joke!"]]
    },
    {
      name: "Paolo Reyes",
      date: "Today · 9:10 AM",
      content: "Any recommendations for someone who wants a strong coffee but not too sweet?",
      likes: 8,
      comments: [["Mika Santos", "Try the Americano. Simple and strong."], ["Jules Garcia", "Kapeng Barako is worth trying too."]]
    },
    {
      name: "Ana Cruz",
      date: "Yesterday · 4:35 PM",
      content: "Study reminder: take a short break, drink some water, and don't forget to rest.",
      likes: 16,
      comments: [["Jules Garcia", "Needed this reminder today. Thank you!"]]
    }
  ];

  feed.textContent = "";
  posts.forEach(function (post) {
    const card = document.createElement("article");
    card.className = "community-post";

    const author = document.createElement("div");
    author.className = "post-author";
    const name = document.createElement("strong");
    name.textContent = post.name;
    const date = document.createElement("small");
    date.textContent = post.date;
    author.append(name, date);

    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.content;

    const actions = document.createElement("div");
    actions.className = "post-actions";
    const likes = document.createElement("span");
    likes.textContent = "♡ " + post.likes + " Likes";
    const count = document.createElement("span");
    count.textContent = post.comments.length + (post.comments.length === 1 ? " comment" : " comments");
    actions.append(likes, count);

    const comments = document.createElement("div");
    comments.className = "post-comments";
    const heading = document.createElement("span");
    heading.className = "comments-heading";
    heading.textContent = "COMMENTS";
    comments.appendChild(heading);

    post.comments.forEach(function (comment) {
      const line = document.createElement("p");
      const commenter = document.createElement("strong");
      commenter.textContent = comment[0] + ": ";
      line.append(commenter, document.createTextNode(comment[1]));
      comments.appendChild(line);
    });

    card.append(author, content, actions, comments);
    feed.appendChild(card);
  });
}
