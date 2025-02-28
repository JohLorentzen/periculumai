import { ScanQRCode } from "@/components/ScanQRCode";

export default function DebugPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Signicat Debug Tools</h1>
      
      <div className="space-y-8">
        <ScanQRCode />
        
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Additional Troubleshooting</h2>
          
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">PKCE Authentication</h3>
            <p className="mt-2 text-sm">
              Signicat requires PKCE (Proof Key for Code Exchange) for added security. Our tools now implement this by:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2 text-sm">
              <li>Generating a random code verifier</li>
              <li>Creating a SHA-256 hash of the verifier (code challenge)</li>
              <li>Including the code challenge in the authorization request</li>
              <li>Storing the code verifier in cookies for the callback</li>
              <li>Sending the original verifier during token exchange</li>
            </ol>
            <p className="mt-2 text-sm">
              The debug tools automatically handle this for you, but if you&apos;re seeing a &quot;code challenge required&quot; error, it means your implementation is missing PKCE.
            </p>
          </div>
          
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200">Fixing &quot;Invalid scope&quot; Error</h3>
            <p className="mt-2 text-sm">
              The &quot;Invalid scope&quot; error occurs when you request scopes that haven&apos;t been configured for your Signicat client. To fix it:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2 text-sm">
              <li>Login to your Signicat dashboard</li>
              <li>Find your client application settings</li>
              <li>Look for &quot;Scopes&quot; or &quot;Permissions&quot; section</li>
              <li>Enable the scopes you need (at minimum, enable &quot;openid&quot;)</li>
              <li>If you can&apos;t enable certain scopes, adjust your code to only request authorized scopes</li>
            </ol>
            <p className="mt-2 text-sm font-medium">Common Signicat Scopes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
              <li><code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">openid</code> - Basic identity info (required)</li>
              <li><code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">profile</code> - User profile information</li>
              <li><code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">idp-id</code> - Identity provider ID information</li>
              <li><code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">nin</code> - National identity number</li>
              <li><code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">nbid-extra</code> - Additional BankID information</li>
            </ul>
            <p className="mt-2 text-sm">
              Use the scope testing tool above to try different combinations and determine what works with your account.
            </p>
          </div>
          
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Fixing &quot;Failed to validate OIDC state&quot; Error</h3>
            <p className="mt-2 text-sm">
              This error occurs when the state parameter sent in the authorization request doesn&apos;t match
              the state received in the callback. The state parameter is used for security to prevent CSRF attacks.
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2 text-sm">
              <li>We&apos;ve simplified the state handling to use a random string</li>
              <li>The state is stored in a cookie named <code className="bg-red-200 dark:bg-red-800 px-1 rounded">auth_state</code></li>
              <li>During the callback, we verify that the state parameter matches what&apos;s in the cookie</li>
              <li>If you&apos;re seeing this error, it could be because:</li>
              <ul className="list-disc pl-5 space-y-1 mt-1 text-sm ml-6">
                <li>Cookies are being blocked or not properly stored</li>
                <li>The browser session was reset during authentication</li>
                <li>The state parameter was modified during transmission</li>
              </ul>
            </ol>
            <p className="mt-2 text-sm">
              Our updated implementation uses a simpler approach to state management that should resolve this issue.
            </p>
          </div>
          
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Fixing &quot;Invalid redirect_uri&quot; Error</h3>
            <p className="mt-2 text-sm">
              This error occurs when the redirect URI in your authorization request doesn&apos;t <strong>exactly</strong> match
              what&apos;s registered in the Signicat dashboard. To fix it:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-2 text-sm">
              <li>Login to your Signicat dashboard</li>
              <li>Navigate to your application settings</li>
              <li>Check the registered redirect URIs</li>
              <li>Make sure it <strong>exactly</strong> matches: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">http://localhost:3000/api/auth/callback</code></li>
              <li>If you can&apos;t change it in Signicat, update your .env.local file to match what&apos;s registered there</li>
            </ol>
            <p className="mt-2 text-sm">
              Use the test input above to try different URI variations until you find one that works.
            </p>
          </div>
          
          <h3 className="text-lg font-medium mt-4">Common Issues</h3>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Redirect URI mismatch</strong> - Your redirect URI must exactly match what&apos;s configured 
              in the Signicat dashboard.
            </li>
            <li>
              <strong>Missing PKCE</strong> - Signicat requires code challenge and code verifier for security.
            </li>
            <li>
              <strong>Invalid Client</strong> - Check that your client ID and secret are correct.
            </li>
            <li>
              <strong>Invalid scope</strong> - Some scopes may not be enabled for your client.
            </li>
            <li>
              <strong>SSL requirement</strong> - Production environments typically require HTTPS redirect URIs.
            </li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Check Your Configuration</h3>
          <p className="text-sm mt-2">
            Verify that the values in your .env.local file match what&apos;s configured in the Signicat dashboard.
            The client_id, redirect_uri, and scopes must be registered correctly.
          </p>
          
          <h3 className="text-lg font-medium mt-4">Debugging Steps</h3>
          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Try the simplified test above (removes some parameters)</li>
            <li>Check browser console logs for detailed error messages</li>
            <li>Check browser network tab to see the actual request URL</li>
            <li>Verify the callback endpoint is correctly implemented</li>
            <li>Confirm that your Signicat account has Norwegian BankID enabled</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 