/**
 * ═══════════════════════════════════════════════════════════════════
 * EMINENT - DEBUG UTILITY
 * Use this in browser console to debug authentication issues
 * ═══════════════════════════════════════════════════════════════════
 */

// Add to window object for easy access in console
window.eminentDebug = {
  // Clear all authentication data
  clearAuth: () => {
    localStorage.removeItem('eminent_token');
    localStorage.removeItem('token');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('eminent_user');
    console.log('✅ All authentication data cleared');
    console.log('🔄 Please refresh the page and login again');
  },

  // Show current token
  showToken: () => {
    const token = localStorage.getItem('eminent_token');
    if (token) {
      console.log('Current token:', token);
      // Decode JWT payload (without verification)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', payload);
        console.log('Expires at:', new Date(payload.exp * 1000).toLocaleString());
        console.log('Issued at:', new Date(payload.iat * 1000).toLocaleString());
        
        // Check if expired
        if (payload.exp * 1000 < Date.now()) {
          console.log('❌ Token is EXPIRED');
        } else {
          console.log('✅ Token is still valid');
        }
      } catch (e) {
        console.log('❌ Could not decode token');
      }
    } else {
      console.log('❌ No token found');
    }
  },

  // Show current user
  showUser: () => {
    const user = localStorage.getItem('eminent_user');
    if (user) {
      console.log('Current user:', JSON.parse(user));
    } else {
      console.log('❌ No user found');
    }
  },

  // Test API connection
  testAPI: async () => {
    console.log('Testing API connection...');
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: `test${Date.now()}@test.com`,
          password: 'Test123!',
          name: 'Test User'
        })
      });
      const data = await response.json();
      if (data.success) {
        console.log('✅ API is working!');
        console.log('New token:', data.token);
        return data;
      } else {
        console.log('❌ API error:', data.message);
      }
    } catch (error) {
      console.log('❌ Cannot connect to API:', error.message);
    }
  },

  // Quick fix - clear and reload
  quickFix: () => {
    localStorage.clear();
    console.log('✅ All data cleared');
    console.log('🔄 Reloading page...');
    setTimeout(() => location.reload(), 1000);
  }
};

console.log('🔧 Eminent Debug Utility loaded!');
console.log('Available commands:');
console.log('  eminentDebug.clearAuth()  - Clear authentication data');
console.log('  eminentDebug.showToken()  - Show current token');
console.log('  eminentDebug.showUser()   - Show current user');
console.log('  eminentDebug.testAPI()    - Test API connection');
console.log('  eminentDebug.quickFix()   - Clear all and reload');
