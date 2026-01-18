// ================= Add Product Page Script =================

// DOM Elements
let productForm, productName, productImage, imagePreview, productCategory;
let productPurity, productWeight, productPrice, productDescription;
let addProductBtn, backToShopBtn, successMessage;

// Initialize elements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
  checkAuthentication();
});

// Initialize DOM elements
function initializeElements() {
  productForm = document.getElementById('productForm');
  productName = document.getElementById('productName');
  productImage = document.getElementById('productImage');
  imagePreview = document.getElementById('imagePreview');
  productCategory = document.getElementById('productCategory');
  productPurity = document.getElementById('productPurity');
  productWeight = document.getElementById('productWeight');
  productPrice = document.getElementById('productPrice');
  productDescription = document.getElementById('productDescription');
  addProductBtn = document.getElementById('addProductBtn');
  backToShopBtn = document.getElementById('backToShopBtn');
  successMessage = document.getElementById('successMessage');
}

// Setup event listeners
function setupEventListeners() {
  // Image preview
  productImage.addEventListener('change', handleImagePreview);

  // Form submission
  productForm.addEventListener('submit', handleFormSubmit);

  // Back to shop button
  backToShopBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

// Check if user is authenticated (admin access)
function checkAuthentication() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = localStorage.getItem('currentUser');

  if (!isLoggedIn || !currentUser) {
    alert('Please login as admin to add products.');
    window.location.href = 'index.html';
    return;
  }

  // Update welcome message
  const welcomeUser = document.getElementById('welcomeUser');
  if (welcomeUser) {
    welcomeUser.textContent = currentUser;
  }
}

// Handle image preview
function handleImagePreview(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '';
    imagePreview.style.display = 'none';
  }
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Create product object
  const newProduct = {
    name: productName.value.trim(),
    image: imagePreview.src, // Base64 encoded image
    purity: productPurity.value,
    weight: parseFloat(productWeight.value),
    description: productDescription.value.trim(),
    category: productCategory.value,
    totalPrice: parseInt(productPrice.value),
    id: Date.now(), // Unique ID based on timestamp
    dateAdded: new Date().toISOString()
  };

  // Save product
  saveProduct(newProduct);

  // Show success message
  showSuccessMessage();

  // Reset form
  resetForm();
}

// Validate form
function validateForm() {
  let isValid = true;
  const errors = [];

  // Check required fields
  if (!productName.value.trim()) {
    errors.push('Product name is required');
    isValid = false;
  }

  if (!productImage.files[0]) {
    errors.push('Product image is required');
    isValid = false;
  }

  if (!productCategory.value) {
    errors.push('Category is required');
    isValid = false;
  }

  if (!productPurity.value) {
    errors.push('Purity is required');
    isValid = false;
  }

  if (!productWeight.value || productWeight.value <= 0) {
    errors.push('Valid weight is required');
    isValid = false;
  }

  if (!productPrice.value || productPrice.value <= 0) {
    errors.push('Valid price is required');
    isValid = false;
  }

  if (!productDescription.value.trim()) {
    errors.push('Description is required');
    isValid = false;
  }

  // Show errors if any
  if (!isValid) {
    alert('Please fix the following errors:\n' + errors.join('\n'));
  }

  return isValid;
}

// Save product to localStorage
function saveProduct(product) {
  // Get existing products from localStorage
  const existingProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

  // Add new product
  existingProducts.push(product);

  // Save back to localStorage
  localStorage.setItem('customProducts', JSON.stringify(existingProducts));
}

// Show success message
function showSuccessMessage() {
  successMessage.style.display = 'block';
  successMessage.style.opacity = '1';

  // Hide after 3 seconds
  setTimeout(() => {
    successMessage.style.opacity = '0';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 300);
  }, 3000);
}

// Reset form
function resetForm() {
  productForm.reset();
  imagePreview.src = '';
  imagePreview.style.display = 'none';
}

// ================= Utility Functions =================

// Format price with commas
function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
