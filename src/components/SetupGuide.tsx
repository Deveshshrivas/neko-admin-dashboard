import { AlertCircle, CheckCircle2, Copy, ExternalLink } from 'lucide-react'

export default function SetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dashboard Setup Required
          </h1>
          <p className="text-gray-600 text-lg">
            Configure your Supabase connection to get started
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-3xl mr-3">⚠️</span>
              Missing Configuration
            </h2>
            <p className="text-gray-600">
              Your Supabase URL and API key are not configured. The dashboard needs these to connect to your database.
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-blue-500 mr-3">1</span>
                <h3 className="text-xl font-semibold text-gray-800">Open Project File</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Locate this file in your project:
              </p>
              <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
                <code className="text-sm text-gray-700">.env.local</code>
                <button
                  onClick={() => copyToClipboard('.env.local')}
                  className="text-blue-500 hover:text-blue-700"
                  title="Copy filename"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                (If this file doesn't exist, create it in the project root directory)
              </p>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-blue-500 mr-3">2</span>
                <h3 className="text-xl font-semibold text-gray-800">Get Supabase Credentials</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Visit your Supabase project and get your URL and API key:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-2">
                <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center inline">supabase.com <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                <li>Open your project</li>
                <li>Click <strong>Settings</strong> (gear icon, bottom left)</li>
                <li>Click <strong>API</strong> in the left sidebar</li>
                <li>Copy your <strong>Project URL</strong> and <strong>anon/public key</strong></li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-blue-500 mr-3">3</span>
                <h3 className="text-xl font-semibold text-gray-800">Add to .env.local</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Add these lines to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
                    <div>VITE_SUPABASE_ANON_KEY=your-api-key-here</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-api-key-here')}
                    className="text-blue-400 hover:text-blue-300"
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Replace the placeholder values with your actual credentials from Supabase
              </p>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-blue-500 mr-3">4</span>
                <h3 className="text-xl font-semibold text-gray-800">Add Table & Column Names</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Add all table and column names from your database. View the complete configuration file:
              </p>
              <p className="text-gray-600">
                See <code className="bg-gray-100 px-2 py-1 rounded">.env.example</code> for all 70+ environment variables
              </p>
            </div>

            {/* Step 5 */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-green-500 mr-3">5</span>
                <h3 className="text-xl font-semibold text-gray-800">Restart Development Server</h3>
              </div>
              <p className="text-gray-600 mb-2">
                After saving <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>, restart your dev server:
              </p>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                <div className="flex justify-between items-start">
                  <div>npm run dev</div>
                  <button
                    onClick={() => copyToClipboard('npm run dev')}
                    className="text-blue-400 hover:text-blue-300"
                    title="Copy command"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-blue-500 mr-2">ℹ️</span>
              Need Help?
            </h3>
            <ul className="text-gray-600 space-y-1 text-sm ml-6">
              <li>📖 Read <strong>SETUP_CHECKLIST.md</strong> for step-by-step guide</li>
              <li>📋 Read <strong>ENV_CONFIG_REFERENCE.md</strong> for all environment variables</li>
              <li>📚 Read <strong>ENV_SETUP_GUIDE.md</strong> for detailed setup help</li>
              <li>🔧 Read <strong>CONFIGURATION_GUIDE.md</strong> to understand how configuration works</li>
            </ul>
          </div>

          {/* Success Checklist */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              Before You Continue
            </h3>
            <div className="space-y-2 text-sm ml-7">
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">.env.local file created</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">VITE_SUPABASE_URL added</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">VITE_SUPABASE_ANON_KEY added</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">Table names added (7 tables)</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">Column names added (60+ columns)</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <span className="text-gray-600">Dev server restarted</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>
            Once you've completed these steps, refresh this page to see your data! 🚀
          </p>
          <p className="mt-2">
            <button
              onClick={() => window.location.reload()}
              className="text-blue-500 hover:underline font-semibold"
            >
              Refresh Page
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
