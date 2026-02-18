// Service to handle authentication-related API calls and token management

class AuthService {
  constructor() {
    this.token = null;
    this.user = null;
    this.loadToken();
  }

  /**
   * Load token from localStorage
   */
  loadToken() {
    // Check if we're in a browser environment (not server-side)
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        // Decode token to get user info (basic JWT decode)
        this.user = this.parseJwt(token);
      }
    }
  }

  /**
   * Save token to localStorage
   */
  saveToken(token) {
    this.token = token;
    // Check if we're in a browser environment (not server-side)
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('authToken', token);
    }

    // Decode token to get user info
    this.user = this.parseJwt(token);
  }

  /**
   * Remove token from localStorage
   */
  removeToken() {
    this.token = null;
    this.user = null;
    // Check if we're in a browser environment (not server-side)
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Decode JWT token (without verification)
   */
  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    if (!this.token) {
      return false;
    }

    // Check if token is expired
    if (this.user && this.user.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime >= this.user.exp) {
        this.removeToken(); // Remove expired token
        return false;
      }
    }

    return true;
  }

  /**
   * Get current user info
   */
  getCurrentUser() {
    if (this.isAuthenticated()) {
      return this.user;
    }
    return null;
  }

  /**
   * Logout user
   */
  logout() {
    this.removeToken();
  }

  /**
   * Handle authentication callback from OAuth provider
   */
  handleCallback(token) {
    if (token) {
      this.saveToken(token);
      return true;
    }
    return false;
  }

  /**
   * Get auth headers for API requests
   */
  getAuthHeaders() {
    if (this.isAuthenticated()) {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      };
    }
    return {
      'Content-Type': 'application/json'
    };
  }
}

// Export singleton instance
export default new AuthService();