interface SignicatAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export class SignicatService {
  private static readonly BASE_URL = process.env.SIGNICAT_BASE_URL;
  private static readonly CLIENT_ID = process.env.SIGNICAT_CLIENT_ID;
  private static readonly CLIENT_SECRET = process.env.SIGNICAT_CLIENT_SECRET;
  private static readonly REDIRECT_URI = process.env.SIGNICAT_REDIRECT_URI;
  private static readonly TOKEN_ENDPOINT = '/oidc/token';
  private static readonly AUTH_ENDPOINT = '/oidc/authorize';

  static getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID!,
      redirect_uri: this.REDIRECT_URI!,
      response_type: 'code',
      scope: 'openid profile',
      state: this.generateState(),
    });

    return `${this.BASE_URL}${this.AUTH_ENDPOINT}?${params.toString()}`;
  }

  static async exchangeCodeForToken(code: string): Promise<SignicatAuthResponse> {
    const tokenEndpoint = `${this.BASE_URL}${this.TOKEN_ENDPOINT}`;
    
    // Create Basic Auth header using client credentials
    const basicAuth = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');
    
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.REDIRECT_URI!,
    });

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token exchange failed: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data as SignicatAuthResponse;

    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  // Method to get user info using the access token
  static async getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/oidc/userinfo`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  private static generateState(): string {
    return crypto.getRandomValues(new Uint8Array(16))
      .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }
} 