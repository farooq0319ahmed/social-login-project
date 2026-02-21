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

  /**
   * Get current user info from API
   */
  async getCurrentUserFromAPI() {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        // If unauthorized, clear the token
        if (response.status === 401) {
          this.logout();
        }
        return null;
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  /**
   * Logout from API
   */
  async logoutFromAPI() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        this.logout();
        return true;
      } else {
        // Even if API logout fails, still clear local token
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('Error during logout:', error);
      this.logout();
      return false;
    }
  }

  /**
   * Initiate Google OAuth flow
   */
  async initiateGoogleLogin() {
    window.location.href = '/api/auth/google';
  }

  /**
   * Initiate Facebook OAuth flow
   */
  async initiateFacebookLogin() {
    window.location.href = '/api/auth/facebook';
  }
}

// Export singleton instance
export default new AuthService();