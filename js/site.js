// Kape-ling Cafe - small browser-based interactions for the website.

document.addEventListener("DOMContentLoaded", function () {
  addLoadingScreen();
  setupPageTransitions();
  addAccountButton();
  setupAccountForms();
  setupCommunity();
  setupMenuCart();
});


// Fade pages gently when visitors move between the cafe sections.
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
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.pathname === window.location.pathname && !url.hash) return;
      event.preventDefault();
      document.body.classList.remove("page-ready");
      document.body.classList.add("page-leave");
      setTimeout(function () {
        window.location.href = url.href;
      }, 220);
    });
  });
}

// Show the coffee animation while the page finishes loading.
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

  window.addEventListener("load", function () {
    setTimeout(function () {
      screen.classList.add("loading-done");
      setTimeout(function () {
        screen.remove();
      }, 500);
    }, 650);
  });
}

// Add the account link to the navigation on every page.
function addAccountButton() {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;

  const link = document.createElement("button");
  link.type = "button";
  link.className = "account-nav-button";
  link.id = "account-open";
  link.textContent = getCurrentUser() ? "My account" : "Log in";
  link.addEventListener("click", function () {
    openAccountModal();
  });
  nav.appendChild(link);
}

// Account details are stored only in this browser for the demo.
function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem("kapeLingCurrentUser") || "null");
  } catch (error) {
    return null;
  }
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem("kapeLingAccounts") || "[]");
  } catch (error) {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem("kapeLingAccounts", JSON.stringify(accounts));
}

function openAccountModal() {
  let modal = document.querySelector(".account-modal");
  if (!modal) {
    modal = document.createElement("div");
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
        <p class="account-message" aria-live="polite"></p>
        <form class="account-form" novalidate>
          <label class="signup-only">Full name
            <input name="name" type="text" autocomplete="name" placeholder="e.g. Juan Dela Cruz">
            <small>Enter at least two words using letters only.</small>
          </label>
          <label>Email address
            <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required>
          </label>
          <label>Password
            <input name="password" type="password" autocomplete="current-password" placeholder="At least 8 characters" required>
            <small class="signup-only">Use at least 8 characters, including a letter and a number.</small>
          </label>
          <label class="signup-only">Confirm password
            <input name="confirm" type="password" autocomplete="new-password" placeholder="Enter your password again">
          </label>
          <button class="button account-submit" type="submit">Log in</button>
        </form>
        <p class="account-note">Demo account only. Your profile is saved in this browser, not on a secure account server.</p>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector(".modal-close").addEventListener("click", closeAccountModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeAccountModal();
    });
    modal.querySelectorAll(".account-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setAccountMode(tab.dataset.mode);
      });
    });
    modal.querySelector(".account-form").addEventListener("submit", handleAccountSubmit);
    setAccountMode("login");
  }

  modal.classList.add("modal-visible");
  document.body.classList.add("modal-open");
  const current = getCurrentUser();
  if (current) showAccountDetails(modal, current);
  else showAccountFormAgain();
}

function closeAccountModal() {
  const modal = document.querySelector(".account-modal");
  if (modal) modal.classList.remove("modal-visible");
  document.body.classList.remove("modal-open");
}

function setAccountMode(mode) {
  const modal = document.querySelector(".account-modal");
  if (!modal) return;
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
  modal.querySelector(".account-form").reset();
}

function showAccountDetails(modal, user) {
  const form = modal.querySelector(".account-form");
  form.innerHTML = `
    <p class="signed-in-name">You're signed in as <strong></strong>.</p>
    <button class="button account-submit" type="button">Log out</button>`;
  form.querySelector("strong").textContent = user.name;
  form.querySelector("button").addEventListener("click", function () {
    sessionStorage.removeItem("kapeLingCurrentUser");
    window.location.reload();
  });
  modal.querySelector(".account-tabs").hidden = true;
  modal.querySelector(".account-message").textContent = "";
  modal.querySelector(".account-note").textContent = "Thanks for stopping by Kape-ling Cafe.";
  const title = modal.querySelector("#account-title");
  title.textContent = "Welcome back, " + user.name.split(" ")[0] + ".";
}

function showAccountFormAgain() {
  const modal = document.querySelector(".account-modal");
  if (!modal) return;
  modal.querySelector(".account-tabs").hidden = false;
  modal.querySelector(".account-note").textContent = "Demo account only. Your profile is saved in this browser, not on a secure account server.";
  modal.querySelector("#account-title").textContent = "Good to have you here.";
  setAccountMode("login");
}

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(salt + password);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map(function (byte) {
    return byte.toString(16).padStart(2, "0");
  }).join("");
}

async function handleAccountSubmit(event) {
  event.preventDefault();
  const modal = document.querySelector(".account-modal");
  const form = event.currentTarget;
  const data = new FormData(form);
  const mode = modal.dataset.mode;
  const name = String(data.get("name") || "").trim().replace(/\s+/g, " ");
  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "");
  const confirm = String(data.get("confirm") || "");
  const message = modal.querySelector(".account-message");
  const namePattern = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)+$/;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    message.textContent = "Please enter a valid email address.";
    return;
  }
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    message.textContent = "Password must be at least 8 characters and include a letter and a number.";
    return;
  }

  const accounts = getAccounts();
  if (mode === "signup") {
    if (!namePattern.test(name)) {
      message.textContent = "Please enter your full name using at least two proper words.";
      return;
    }
    if (password !== confirm) {
      message.textContent = "Your passwords do not match.";
      return;
    }
    if (accounts.some(function (account) { return account.email === email; })) {
      message.textContent = "That email already has an account. Try logging in.";
      return;
    }

    // A salted hash is used instead of saving the password as plain text.
    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(password, salt);
    accounts.push({ name: name, email: email, salt: salt, passwordHash: passwordHash });
    saveAccounts(accounts);
    sessionStorage.setItem("kapeLingCurrentUser", JSON.stringify({ name: name, email: email }));
    finishAccountLogin(name);
    return;
  }

  const account = accounts.find(function (item) { return item.email === email; });
  if (!account) {
    message.textContent = "We couldn't find an account with that email. Please sign up first.";
    return;
  }
  const enteredHash = await hashPassword(password, account.salt);
  if (enteredHash !== account.passwordHash) {
    message.textContent = "That password doesn't match. Please try again.";
    return;
  }
  sessionStorage.setItem("kapeLingCurrentUser", JSON.stringify({ name: account.name, email: account.email }));
  finishAccountLogin(account.name);
}

function finishAccountLogin(name) {
  const button = document.querySelector("#account-open");
  if (button) button.textContent = "My account";
  const modal = document.querySelector(".account-modal");
  showAccountDetails(modal, { name: name });
  updateCommunityForm();
}

function updateCommunityForm() {
  const form = document.querySelector("#community-post-form");
  const prompt = document.querySelector(".community-login-prompt");
  if (form) form.hidden = !getCurrentUser();
  if (prompt) prompt.hidden = !!getCurrentUser();
}

// Create the discussion area, and save posts/comments/reactions in this browser.
function setupCommunity() {
  const board = document.querySelector(".tambayan-board");
  if (!board) return;

  board.querySelector("#community-login").addEventListener("click", openAccountModal);
  board.querySelector("#community-post-form").addEventListener("submit", addCommunityPost);
  updateCommunityForm();
  renderCommunityPosts();
}

function getPosts() {
  try {
    const savedPosts = localStorage.getItem("kapeLingPosts");
    if (savedPosts) {
      const existingPosts = JSON.parse(savedPosts);
      if (existingPosts.length) return existingPosts;
    }

    const examples = [
      {
        id: "sample-1",
        name: "Mika Santos",
        email: "sample-mika",
        content: "Finally finished our group project! A Spanish latte is definitely deserved after that.",
        date: "Community example",
        comments: [
          { name: "Paolo Reyes", text: "Congrats! You earned that coffee." },
          { name: "Ana Cruz", text: "Same here. Deadlines are no joke!" }
        ],
        reactions: ["sample-paolo", "sample-ana", "sample-jules"]
      },
      {
        id: "sample-2",
        name: "Paolo Reyes",
        email: "sample-paolo",
        content: "Any recommendations for someone who wants a strong coffee but not too sweet?",
        date: "Community example",
        comments: [
          { name: "Mika Santos", text: "Try the Americano. Simple and strong." },
          { name: "Jules Garcia", text: "Kapeng Barako is worth trying too." }
        ],
        reactions: ["sample-mika", "sample-ana"]
      },
      {
        id: "sample-3",
        name: "Ana Cruz",
        email: "sample-ana",
        content: "Study reminder: take a short break, drink some water, and don't forget to rest.",
        date: "Community example",
        comments: [
          { name: "Jules Garcia", text: "Needed this reminder today. Thank you!" }
        ],
        reactions: ["sample-mika", "sample-paolo"]
      }
    ];
    localStorage.setItem("kapeLingPosts", JSON.stringify(examples));
    return examples;
  } catch (error) {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem("kapeLingPosts", JSON.stringify(posts));
}

function hasGoodWords(text, minimum) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length >= minimum && words.every(function (word) {
    return /[A-Za-zÀ-ÿ]{2,}/.test(word);
  });
}

function addCommunityPost(event) {
  event.preventDefault();
  const field = document.querySelector("#community-post");
  const feedback = document.querySelector(".form-feedback");
  const content = field.value.trim().replace(/\s+/g, " ");
  const user = getCurrentUser();
  if (!user) {
    openAccountModal();
    return;
  }
  if (!hasGoodWords(content, 3)) {
    feedback.textContent = "Please write at least three clear words before posting.";
    return;
  }

  const posts = getPosts();
  posts.unshift({
    id: Date.now().toString(),
    name: user.name,
    email: user.email,
    content: content,
    date: new Date().toLocaleString(),
    comments: [],
    reactions: []
  });
  savePosts(posts);
  field.value = "";
  feedback.textContent = "Your post has been added.";
  renderCommunityPosts();
}

function renderCommunityPosts() {
  const feed = document.querySelector(".community-feed");
  if (!feed) return;
  feed.textContent = "";
  const posts = getPosts();
  if (!posts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-feed";
    empty.textContent = "No posts yet. Be the first to start a conversation.";
    feed.appendChild(empty);
    return;
  }

  posts.forEach(function (post) {
    const card = document.createElement("article");
    card.className = "community-post";
    const top = document.createElement("div");
    top.className = "post-author";
    const name = document.createElement("strong");
    name.textContent = post.name;
    const date = document.createElement("small");
    date.textContent = post.date;
    top.append(name, date);
    const body = document.createElement("p");
    body.className = "post-content";
    body.textContent = post.content;
    const actions = document.createElement("div");
    actions.className = "post-actions";
    const react = document.createElement("button");
    react.type = "button";
    react.className = "reaction-button";
    const user = getCurrentUser();
    const liked = user && post.reactions.includes(user.email);
    react.textContent = (liked ? "♥" : "♡") + " " + post.reactions.length + " Like";
    react.classList.toggle("reacted", !!liked);
    react.addEventListener("click", function () { toggleReaction(post.id); });
    const commentCount = document.createElement("span");
    commentCount.textContent = post.comments.length + (post.comments.length === 1 ? " comment" : " comments");
    actions.append(react, commentCount);

    const comments = document.createElement("div");
    comments.className = "post-comments";
    post.comments.forEach(function (comment) {
      const line = document.createElement("p");
      const author = document.createElement("strong");
      author.textContent = comment.name + ": ";
      line.append(author, document.createTextNode(comment.text));
      comments.appendChild(line);
    });

    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 180;
    input.placeholder = "Write a comment...";
    input.setAttribute("aria-label", "Write a comment");
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Comment";
    commentForm.append(input, submit);
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addComment(post.id, input.value);
    });

    card.append(top, body, actions, comments, commentForm);
    feed.appendChild(card);
  });
}

function toggleReaction(postId) {
  const user = getCurrentUser();
  if (!user) {
    openAccountModal();
    return;
  }
  const posts = getPosts();
  const post = posts.find(function (item) { return item.id === postId; });
  if (!post) return;
  const index = post.reactions.indexOf(user.email);
  if (index >= 0) post.reactions.splice(index, 1);
  else post.reactions.push(user.email);
  savePosts(posts);
  renderCommunityPosts();
}

function addComment(postId, text) {
  const user = getCurrentUser();
  if (!user) {
    openAccountModal();
    return;
  }
  const cleanText = text.trim().replace(/\s+/g, " ");
  if (!hasGoodWords(cleanText, 2)) {
    alert("Please write at least two clear words for your comment.");
    return;
  }
  const posts = getPosts();
  const post = posts.find(function (item) { return item.id === postId; });
  if (!post) return;
  post.comments.push({ name: user.name, text: cleanText });
  savePosts(posts);
  renderCommunityPosts();
}

// Turn each listed menu price into a selectable item and keep a live cart total.
function setupMenuCart() {
  const rows = document.querySelectorAll(".menu-category .price-row");
  if (!rows.length) return;

  rows.forEach(function (row) {
    const category = row.closest(".menu-category");
    const headings = category.querySelector(".price-head");
    const labels = headings
      ? Array.from(headings.querySelectorAll("span")).slice(1).map(function (item) { return item.textContent.trim(); })
      : ["Regular"];
    const name = row.querySelector("h3");
    const prices = row.querySelectorAll(":scope > b");
    const options = [];

    prices.forEach(function (price, index) {
      const match = price.textContent.trim().match(/^₱\s*([\d,]+)$/);
      if (!match) return;
      options.push({
        name: name.textContent.trim(),
        size: labels[index] || "Regular",
        price: Number(match[1].replace(/,/g, ""))
      });
    });

    if (!options.length) return;
    const controls = document.createElement("div");
    controls.className = "menu-order-options";
    const orderLabel = document.createElement("span");
    orderLabel.className = "order-label";
    orderLabel.textContent = "ADD TO CART";
    controls.appendChild(orderLabel);
    options.forEach(function (option) {
      const item = document.createElement("div");
      item.className = "menu-order-option";
      item.dataset.cartKey = option.name + "|" + option.size;
      const label = document.createElement("span");
      label.textContent = option.size + " · ₱" + option.price;
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Remove one " + option.name);
      const quantity = document.createElement("span");
      quantity.className = "item-quantity";
      quantity.textContent = "0";
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "add-order-button";
      addButton.textContent = "Add to order";
      addButton.setAttribute("aria-label", "Add one " + option.name + " to your order");
      minus.addEventListener("click", function () { changeCartItem(option, -1); });
      addButton.addEventListener("click", function () { changeCartItem(option, 1); });
      item.append(label, minus, quantity, addButton);
      controls.appendChild(item);
      option.quantityElement = quantity;
    });
    row.insertAdjacentElement("afterend", controls);
  });

  const cart = document.createElement("section");
  cart.className = "order-cart";
  cart.id = "order-cart";
  cart.innerHTML = `
    <div class="cart-heading"><div><p class="eyebrow">YOUR ORDER</p><h2>Your coffee <em>list.</em></h2></div><span class="cart-count">0 items</span></div>
    <div class="cart-items"><p class="cart-empty">Your cart is empty. Add something from the menu.</p></div>
    <div class="cart-total"><span>Total</span><strong>₱0</strong></div>
    <button type="button" class="clear-cart">Clear cart</button>
    <p class="cart-note">This is a sample cart. Orders are not sent to the cafe yet.</p>`;
  document.querySelector(".menu-board").appendChild(cart);
  updateCart();
}

let cartItems = {};

function changeCartItem(option, amount) {
  const key = option.name + "|" + option.size;
  if (!cartItems[key]) {
    cartItems[key] = { name: option.name, size: option.size, price: option.price, quantity: 0 };
  }
  cartItems[key].quantity = Math.max(0, cartItems[key].quantity + amount);
  if (cartItems[key].quantity === 0) delete cartItems[key];
  updateCart();
  updateMenuQuantities();
}

function updateMenuQuantities() {
  document.querySelectorAll(".menu-order-option").forEach(function (element) {
    const key = element.dataset.cartKey;
    const quantity = cartItems[key] ? cartItems[key].quantity : 0;
    element.querySelector(".item-quantity").textContent = quantity;
  });
}

function updateCart() {
  const cart = document.querySelector(".order-cart");
  if (!cart) return;
  const list = cart.querySelector(".cart-items");
  list.textContent = "";
  const entries = Object.values(cartItems);
  let total = 0;
  let count = 0;

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "cart-empty";
    empty.textContent = "Your cart is empty. Add something from the menu.";
    list.appendChild(empty);
  }

  entries.forEach(function (item) {
    total += item.price * item.quantity;
    count += item.quantity;
    const line = document.createElement("div");
    line.className = "cart-line";
    const name = document.createElement("span");
    name.textContent = item.name + " (" + item.size + ") × " + item.quantity;
    const price = document.createElement("strong");
    price.textContent = "₱" + (item.price * item.quantity).toLocaleString();
    line.append(name, price);
    list.appendChild(line);
  });

  cart.querySelector(".cart-count").textContent = count + (count === 1 ? " item" : " items");
  cart.querySelector(".cart-total strong").textContent = "₱" + total.toLocaleString();
  cart.querySelector(".clear-cart").disabled = !entries.length;
  cart.querySelector(".clear-cart").onclick = function () {
    cartItems = {};
    updateCart();
    updateMenuQuantities();
  };
}
