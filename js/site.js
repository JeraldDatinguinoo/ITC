// Kape-ling Cafe - simple visual interactions for the website.

document.addEventListener("DOMContentLoaded", function () {
  addLoadingScreen();
  setupAccountModal();
  showCommunityExamples();
});

// Use the loading screen already written in the HTML so it appears before the page.
function addLoadingScreen() {
  const screen = document.querySelector(".loading-screen");
  if (!screen) {
    document.documentElement.classList.remove("loading-active");
    return;
  }

  function hideScreen() {
    setTimeout(function () {
      screen.classList.add("loading-done");
      document.documentElement.classList.remove("loading-active");
      setTimeout(function () { screen.remove(); }, 500);
    }, 900);
  }

  if (document.readyState === "complete") hideScreen();
  else window.addEventListener("load", hideScreen, { once: true });
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
      content: "Finally submitted our research 😭 I don't want to hear the words “Chapter 4” for at least a week.",
      likes: 12,
      comments: [
        ["Paolo Reyes", "HAHA congrats!! Ilang kape inabot niyo?"],
        ["Mika Santos", "Two Spanish lattes and one mini breakdown. sulit naman 😭"],
        ["Ana Cruz", "Deserve mo yan. Libre mo kami pag defense na 😂"],
        ["Jules Garcia", "Ako nga hanggang title page pa lang, proud ako sayo beh HAHAHA"],
        ["Bea Mendoza", "Treat yourself muna. deserve na deserve!"]
      ]
    },
    {
      name: "Paolo Reyes",
      date: "Today · 9:10 AM",
      content: "May nakatikim na ba ng Kapeng Barako Cold Brew? Gising na gising ba talaga or masyadong mapait?",
      likes: 8,
      comments: [
        ["Mika Santos", "Tried it last week! Strong siya pero hindi naman lasang gamot HAHA"],
        ["Jules Garcia", "Can confirm. Umorder ako niyan tapos naglinis pa ako ng buong kwarto at 11pm 😭"],
        ["Paolo Reyes", "Okay sold. kailangan ko yan for tonight's review"],
        ["Carlo Dizon", "Bro wag mo lang inumin nang 10pm tapos magtaka ka bakit 3am gising ka pa 😂"],
        ["Nica Flores", "Add mo konting syrup if ayaw mo masyadong bitter!"]
      ]
    },
    {
      name: "Ana Cruz",
      date: "Yesterday · 4:35 PM",
      content: "Sabi ko one hour lang ako mag-aaral. Three hours na, page 2 pa rin ako. Please tell me hindi lang ako 😭",
      likes: 16,
      comments: [
        ["Jules Garcia", "PAGE 2 GANG 😭😭"],
        ["Mika Santos", "HAHA take five muna. Hindi naman tayo hinahabol ng notes"],
        ["Ana Cruz", "Fine. coffee break muna. kayo may kasalanan nito 😂"],
        ["Renz Villanueva", "At least may progress. ako bukas pa lang magsisimula (sana)"],
        ["Bea Mendoza", "Same energy sa buong semester HAHAHA"]
      ]
    },
    {
      name: "Nica Flores",
      date: "Yesterday · 2:18 PM",
      content: "Question lang... worth it pa ba mag first move? We've been talking for months pero ako lagi nauuna mag-chat. Baka delulu lang ako dito HAHAHA 😭",
      likes: 24,
      comments: [
        ["Bea Mendoza", "Girl, gets kita 😭 pero dapat hindi ikaw lang lagi nag-eeffort."],
        ["Carlo Dizon", "Try mo muna wag mag-chat for a bit. See if they reach out too."],
        ["Mika Santos", "Not to be dramatic pero deserve mo rin ma-miss at kamustahin HAHAHA"],
        ["Jules Garcia", "First move is okay, pero don't make a home sa mixed signals beh."],
        ["Paolo Reyes", "As a guy, if interested yan, gagawa yan ng paraan. Not always perfect pero may effort dapat."],
        ["Nica Flores", "Aray naman sa mixed signals 😭 pero thank you guys. noted yan."],
        ["Ana Cruz", "Coffee tayo later. Kwento mo lahat, walang judgment dito 🤎"]
      ]
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
      const line = document.createElement("div");
      line.className = "comment-line";
      const commenter = document.createElement("strong");
      commenter.textContent = comment[0];
      const message = document.createElement("p");
      message.textContent = comment[1];
      line.append(commenter, message);
      comments.appendChild(line);
    });

    card.append(author, content, actions, comments);
    feed.appendChild(card);
  });
}
