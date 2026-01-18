// ================= Products =================
console.log('Script loaded successfully');
// Default products
const defaultProducts = [
  { name: "Gold Ring", image: "images/gold-ring.svg", purity: "22K", weight: 10, description: "Elegant 22K gold ring, perfect for daily wear.", category: "Ladies Ring", totalPrice: 50000 },
  { name: "Gold Necklace", image: "images/gold-necklace.svg", purity: "22K", weight: 20, description: "Beautiful 22K gold necklace for special occasions.", category: "Necklace", totalPrice: 100000 },
  { name: "Gold Bracelet", image: "images/gold-bracelet.svg", purity: "24K", weight: 15, description: "Premium 24K gold bracelet with intricate design.", category: "Bracelet", totalPrice: 75000 },
  { name: "Gold Earrings", image: "images/gold-earrings.svg", purity: "22K", weight: 8, description: "Stylish 22K gold earrings for elegant look.", category: "Earrings", totalPrice: 40000 },
  { name: "Gold Pendant", image: "images/gold-pendant.svg", purity: "24K", weight: 12, description: "24K gold pendant with fine craftsmanship.", category: "Pendant", totalPrice: 60000 },
  { name: "Gold Chain", image: "images/gold-chain.svg", purity: "22K", weight: 25, description: "Elegant 22K gold chain, ideal for gifts.", category: "Chain", totalPrice: 125000 },
  { name: "Silver Ring", image: "images/silver-ring.svg", purity: "Silver", weight: 15, description: "Classic silver ring for everyday style.", category: "Gents Ring", totalPrice: 1500 },
  { name: "Silver Necklace", image: "images/silver-necklace.svg", purity: "Silver", weight: 30, description: "Beautiful silver necklace with modern design.", category: "Necklace", totalPrice: 3000 },
  { name: "Silver Bracelet", image: "images/silver-bracelet.svg", purity: "Silver", weight: 20, description: "Stylish silver bracelet for casual wear.", category: "Bracelet", totalPrice: 2000 },
  { name: "Silver Earrings", image: "images/silver-earrings.svg", purity: "Silver", weight: 10, description: "Elegant silver earrings for any occasion.", category: "Earrings", totalPrice: 1000 },
  { name: "Silver Pendant", image: "images/silver-pendant.svg", purity: "Silver", weight: 18, description: "Silver pendant with delicate craftsmanship.", category: "Pendant", totalPrice: 1800 },
  { name: "Silver Chain", image: "images/silver-chain.svg", purity: "Silver", weight: 35, description: "Versatile silver chain for various styles.", category: "Chain", totalPrice: 3500 },
  // Additional products for more variety
  { name: "Gold Gents Ring", image: "images/gold-ring.svg", purity: "24K", weight: 12, description: "Premium 24K gold ring for gentlemen.", category: "Gents Ring", totalPrice: 65000 },
  { name: "Gold Ladies Ring", image: "images/gold-ring.svg", purity: "22K", weight: 8, description: "Delicate 22K gold ring for ladies.", category: "Ladies Ring", totalPrice: 45000 },
  { name: "Silver Ladies Ring", image: "images/silver-ring.svg", purity: "Silver", weight: 12, description: "Elegant silver ring for ladies.", category: "Ladies Ring", totalPrice: 1200 },
  // New products with additional images
  { name: "Diamond Gold Ring", image: "images/diamond-gold-ring.jpg", purity: "22K", weight: 14, description: "Stunning 22K gold ring with diamond accents.", category: "Ladies Ring", totalPrice: 85000 },
  { name: "Pearl Necklace", image: "images/pearl-necklace.jpg", purity: "Silver", weight: 25, description: "Elegant pearl necklace on silver chain.", category: "Necklace", totalPrice: 5500 },
  { name: "Gold Bangle Set", image: "images/gold-bangle-set.jpg", purity: "22K", weight: 50, description: "Traditional 22K gold bangle set for festivals.", category: "Bracelet", totalPrice: 250000 },
  { name: "Silver Anklet", image: "images/silver-anklet.jpg", purity: "Silver", weight: 22, description: "Delicate silver anklet with bell charms.", category: "Bracelet", totalPrice: 2200 },
  { name: "Gold Nose Pin", image: "images/gold-nose-pin.jpg", purity: "24K", weight: 2, description: "Fine 24K gold nose pin for traditional wear.", category: "Pendant", totalPrice: 12000 },
  { name: "Silver Toe Ring", image: "images/silver-toe-ring.jpg", purity: "Silver", weight: 5, description: "Stylish silver toe ring for casual wear.", category: "Ladies Ring", totalPrice: 800 },
  { name: "Gold Mangalsutra", image: "images/gold-mangalsutra.jpg", purity: "22K", weight: 18, description: "Traditional 22K gold mangalsutra design.", category: "Necklace", totalPrice: 95000 },
  { name: "Silver Keychain", image: "images/silver-keychain.jpg", purity: "Silver", weight: 15, description: "Elegant silver keychain with custom engraving.", category: "Chain", totalPrice: 1500 },
  { name: "Gold Cufflinks", image: "images/gold-cufflinks.jpg", purity: "18K", weight: 10, description: "Premium 18K gold cufflinks for formal wear.", category: "Gents Ring", totalPrice: 45000 },
  { name: "Silver Hair Accessories", image: "images/silver-hair-accessories.jpg", purity: "Silver", weight: 8, description: "Beautiful silver hair clips and accessories.", category: "Earrings", totalPrice: 1200 }
];

// Load products from localStorage and merge with defaults
let products = loadProducts();

function loadProducts() {
  try {
    const customProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    console.log('Default products:', defaultProducts.length);
    console.log('Custom products:', customProducts.length);
    const allProducts = [...defaultProducts, ...customProducts];
    console.log('Total products:', allProducts.length);
    return allProducts;
  } catch (error) {
    console.error('Error loading products:', error);
    return defaultProducts;
  }
}

let cart = [];
let currentProduct = null;

// ================= Elements =================
// These will be initialized when DOM is ready
let loginScreen, homeScreen, usernameInput, passwordInput, loginBtn, registerBtn;
let addProductBtn, logoutBtn, loginStatusBtn, userStatus, loginClose, cartBtn, cartCount, cartScreen;
let cartList, cartTotal, closeCartBtn, productModal, modalImg, modalName;
let modalPurity, modalWeight, modalPrice, modalDesc, addToCartBtn, modalClose;
let productGrid, minWeight, maxWeight, purityFilter, maxPrice, applyFilters;
let searchInput, searchBtn, categoryFilter, checkoutBtn;
let authScreen, authTitle, authMessage, confirmPasswordInput, confirmPasswordGroup;
let authSubmitBtn, authSwitchBtn, authHint;

// Global variables
let isLoggedIn = false;
let currentUser = null;
let isRegisterMode = false;

// ================= Authentication Functions =================
function showAuthModal(registerMode = false){
  isRegisterMode = registerMode;

  if(isRegisterMode){
    authTitle.innerHTML = '<i class="fas fa-user-plus"></i> Register';
    authMessage.textContent = 'Create your account to start shopping';
    authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Register';
    authSwitchBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Already have an account?';
    authHint.textContent = 'Choose any username and password';
    confirmPasswordGroup.style.display = 'block';
  } else {
    authTitle.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    authMessage.textContent = 'Welcome back! Please sign in to continue';
    authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    authSwitchBtn.innerHTML = '<i class="fas fa-user-plus"></i> Need to create an account?';
    authHint.textContent = 'Demo: any username + password "jewelry123"';
    confirmPasswordGroup.style.display = 'none';
  }

  // Clear form
  usernameInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';

  authScreen.style.display = "flex";
}

function handleLogin(){
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if(username && password){
    // Simple password check - in real app, this would be server-side
    if(password === "jewelry123"){ // Demo password
      isLoggedIn = true;
      currentUser = username;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
      authScreen.style.display = "none";
      updateUserStatus();
      // If user was trying to add to cart, proceed with that action
      if(currentProduct){
        addToCart();
      }
    } else {
      alert("Invalid password. Try 'jewelry123'");
    }
  } else {
    alert("Please enter both username and password");
  }
}

function handleRegister(){
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if(username && password && confirmPassword){
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    // Simple registration - in real app, this would create user account
    isLoggedIn = true;
    currentUser = username;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
    authScreen.style.display = "none";
    updateUserStatus();
    alert(`Welcome ${username}! Your account has been created.`);
    // If user was trying to add to cart, proceed with that action
    if(currentProduct){
      addToCart();
    }
  } else {
    alert("Please fill in all fields");
  }
}

// ================= Update User Status =================
function updateUserStatus(){
  if(isLoggedIn && currentUser){
    userStatus.textContent = `Welcome, ${currentUser}`;
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    addProductBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'inline-block';
  } else {
    userStatus.textContent = "Welcome, Guest";
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    addProductBtn.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}

// ================= Logout Function =================
function logout(){
  // Clear login state
  isLoggedIn = false;
  currentUser = null;
  
  // Clear localStorage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  
  // Update UI
  updateUserStatus();
  
  // Clear cart (optional - you might want to keep cart)
  cart = [];
  updateCartCount();
  
  // Show confirmation
  alert('You have been logged out successfully.');
}

// ================= Real-Time Gold Price =================
async function fetchGoldPrice() {
  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
      method: 'GET',
      headers: { 'x-access-token': 'INSERT_YOUR_API_KEY_HERE', 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.price;
  } catch(e){
    console.error(e);
    return 1700000; // fallback price per ounce
  }
}

// Update prices per gram
async function updateProductPrices(){
  const pricePerOunce = await fetchGoldPrice();
  const gramsPerOunce = 31.1035;
  products.forEach(p=>{
    p.pricePerGram = pricePerOunce / gramsPerOunce;
    p.totalPrice = p.weight * p.pricePerGram;
  });
  renderProducts();
}

// ================= Render Products =================
function renderProducts(list=products){
  console.log('renderProducts called with', list.length, 'products from', products.length, 'total');
  console.log('First few products:', list.slice(0, 3).map(p => p.name));
  productGrid.innerHTML="";
  if (list.length === 0) {
    console.log('No products to render');
    productGrid.innerHTML = '<p>No products found matching your search.</p>';
    return;
  }
  list.forEach((p,i)=>{
    console.log('Rendering product:', p.name);
    const card = document.createElement("div");
    card.className="product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.weight}g, ${p.purity}</p>
      <p>₹${p.totalPrice.toLocaleString(undefined,{minimumFractionDigits:0})}</p>
      <span class="category">${p.category}</span>
    `;
    // Store the product index in the original products array
    const originalIndex = products.findIndex(prod => prod.name === p.name && prod.weight === p.weight);
    card.addEventListener("click", ()=>showProductModal(originalIndex));
    productGrid.appendChild(card);
  });
  console.log('Finished rendering products');
}

// ================= Product Modal =================
function showProductModal(index){
  currentProduct = products[index];
  modalImg.src = currentProduct.image;
  modalName.textContent = currentProduct.name;
  modalPurity.innerHTML = `<i class="fas fa-star"></i> Purity: ${currentProduct.purity}`;
  modalWeight.innerHTML = `<i class="fas fa-weight"></i> Weight: ${currentProduct.weight}g`;
  modalPrice.innerHTML = `<i class="fas fa-rupee-sign"></i> Price: ₹${currentProduct.totalPrice.toLocaleString()}`;
  modalDesc.textContent = currentProduct.description;
  productModal.style.display="flex";
}

function addToCart(){
  cart.push(currentProduct);
  updateCartCount();
  alert(`${currentProduct.name} added to cart!`);
  productModal.style.display="none";
}

function updateCartCount(){ cartCount.textContent=cart.length; }

// ================= Cart =================

function renderCart(){
  cartList.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    const li = document.createElement("li");
    const itemPrice = item.weight*item.pricePerGram;
    total+=itemPrice;
    li.textContent=`${item.name} - ${item.weight}g x ₹${item.pricePerGram.toLocaleString()} = ₹${itemPrice.toLocaleString()}`;
    cartList.appendChild(li);
  });
  cartTotal.textContent = total.toLocaleString();
}

// ================= Filters =================

function applyAllFilters(){
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log('Search input value:', searchInput.value);
  console.log('Searching for (trimmed):', searchTerm);
  const category = categoryFilter.value;
  const minW = parseFloat(minWeight.value) || 0;
  const maxW = parseFloat(maxWeight.value) || Infinity;
  const purity = purityFilter.value;
  const maxP = parseFloat(maxPrice.value) || Infinity;

  console.log('Filters - category:', category, 'minW:', minW, 'maxW:', maxW, 'purity:', purity, 'maxP:', maxP);

  const filtered = products.filter(p=>{
    const matches = (p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            p.purity.toLowerCase().includes(searchTerm)) &&
           (category ? p.category === category : true) &&
           p.weight >= minW && p.weight <= maxW &&
           (purity ? p.purity === purity : true) &&
           p.totalPrice <= maxP;
    if (matches && searchTerm) {
      console.log('Found match:', p.name);
    }
    return matches;
  });

  console.log('Filtered results:', filtered.length, 'products');
  renderProducts(filtered);
}

// ================= Dark Mode =================

// ================= Initialize Page =================
document.addEventListener("DOMContentLoaded", ()=>{
  console.log('DOMContentLoaded fired');
  
  // Load login state from localStorage
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  currentUser = localStorage.getItem('currentUser');
  
  // Initialize elements
  authScreen = document.getElementById("authScreen");
  homeScreen = document.getElementById("homeScreen");
  usernameInput = document.getElementById("usernameInput");
  passwordInput = document.getElementById("passwordInput");
  confirmPasswordInput = document.getElementById("confirmPasswordInput");
  confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
  authTitle = document.getElementById("authTitle");
  authMessage = document.getElementById("authMessage");
  authSubmitBtn = document.getElementById("authSubmitBtn");
  authSwitchBtn = document.getElementById("authSwitchBtn");
  authHint = document.getElementById("authHint");
  loginBtn = document.getElementById("loginBtn");
  registerBtn = document.getElementById("registerBtn");
  addProductBtn = document.getElementById("addProductBtn");
  logoutBtn = document.getElementById("logoutBtn");
  userStatus = document.getElementById("userStatus");
  loginClose = document.querySelector(".login-close");
  cartBtn = document.getElementById("cartBtn");
  cartCount = document.getElementById("cartCount");
  cartScreen = document.getElementById("cartScreen");
  cartList = document.getElementById("cartList");
  cartTotal = document.getElementById("cartTotal");
  closeCartBtn = document.getElementById("closeCartBtn");
  productModal = document.getElementById("productModal");
  modalImg = document.getElementById("modalImg");
  modalName = document.getElementById("modalName");
  modalPurity = document.getElementById("modalPurity");
  modalWeight = document.getElementById("modalWeight");
  modalPrice = document.getElementById("modalPrice");
  modalDesc = document.getElementById("modalDesc");
  addToCartBtn = document.getElementById("addToCartBtn");
  modalClose = document.querySelector(".close");
  productGrid = document.getElementById("productGrid");
  minWeight = document.getElementById("minWeight");
  maxWeight = document.getElementById("maxWeight");
  purityFilter = document.getElementById("purityFilter");
  maxPrice = document.getElementById("maxPrice");
  applyFilters = document.getElementById("applyFilters");
  searchInput = document.getElementById("searchInput");
  searchBtn = document.getElementById("searchBtn");
  categoryFilter = document.getElementById("categoryFilter");
  checkoutBtn = document.getElementById("checkoutBtn");

  console.log('searchInput found:', searchInput);
  console.log('searchBtn found:', searchBtn);
  console.log('searchInput value on init:', searchInput ? searchInput.value : 'null');

  console.log('searchInput found:', searchInput);
  console.log('searchBtn found:', searchBtn);

  // ================= Event Listeners =================
  // Navigation Login Button
  loginBtn.addEventListener("click", ()=>{
    showAuthModal(false); // Show login mode
  });

  // Navigation Register Button
  registerBtn.addEventListener("click", ()=>{
    showAuthModal(true); // Show register mode
  });

  // Navigation Add Product Button
  addProductBtn.addEventListener("click", ()=>{
    window.location.href = 'add-product.html';
  });

  // Navigation Logout Button
  logoutBtn.addEventListener("click", ()=>{
    logout();
  });

  // Auth Modal Submit Button
  authSubmitBtn.addEventListener("click", ()=>{
    if(isRegisterMode){
      handleRegister();
    } else {
      handleLogin();
    }
  });

  // Auth Modal Switch Button
  authSwitchBtn.addEventListener("click", ()=>{
    showAuthModal(!isRegisterMode);
  });

  // Auth Modal Close Button
  loginClose.addEventListener("click", ()=>{
    authScreen.style.display="none";
    currentProduct = null; // Clear any pending product
  });

  // Cart Button
  cartBtn.addEventListener("click", ()=>{
    if(!isLoggedIn){
      alert("Please login to view your cart.");
      showAuthModal(false);
      return;
    }
    renderCart();
    cartScreen.style.display="flex";
  });

  // Close Cart Button
  closeCartBtn.addEventListener("click", ()=>{
    cartScreen.style.display="none";
  });

  // Modal Close
  modalClose.addEventListener("click", ()=>{
    productModal.style.display="none";
  });

  // Add to Cart Button
  addToCartBtn.addEventListener("click", ()=>{
    if(!isLoggedIn){
      showAuthModal(false); // Show login modal if not logged in
      productModal.style.display="none";
      return;
    }
    addToCart();
  });

  // Filters
  applyFilters.addEventListener("click", ()=>{
    applyAllFilters();
  });

  searchBtn.addEventListener("click", ()=>{
    console.log('Search button clicked');
    applyAllFilters();
  });

  searchInput.addEventListener("input", ()=>{
    console.log('Search input event fired, value:', searchInput.value);
    applyAllFilters();
  });

  // Also add keyup event as fallback for some browsers
  searchInput.addEventListener("keyup", ()=>{
    console.log('Search keyup event fired, value:', searchInput.value);
    applyAllFilters();
  });

  // Test if search input is working
  searchInput.addEventListener("focus", ()=>{
    console.log('Search input focused');
  });

  searchInput.addEventListener("blur", ()=>{
    console.log('Search input blurred');
  });

  categoryFilter.addEventListener("change", ()=>{
    applyAllFilters();
  });

  // Checkout
  checkoutBtn.addEventListener("click", ()=>{
    if(cart.length > 0){
      alert("Thank you for your purchase! Your order has been placed.");
      cart = [];
      updateCartCount();
      renderCart();
      cartScreen.style.display="none";
    } else {
      alert("Your cart is empty!");
    }
  });

  // Dark Mode
  const darkModeBtn = document.getElementById("darkModeBtn");
  darkModeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
      darkModeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
  });

  updateUserStatus();
  // Check if productGrid exists
  if (!productGrid) {
    console.error("productGrid element not found!");
    alert("Error: productGrid not found!");
    return;
  }
  console.log('productGrid found:', productGrid);
  renderProducts(); // Show products immediately with default prices
  updateProductPrices(); // Update with real prices in background
});
