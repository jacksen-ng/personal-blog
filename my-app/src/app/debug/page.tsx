import AuthDebugger from "@/components/AuthDebugger";

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>
      
      <AuthDebugger />
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <p className="mb-2">
          This page helps diagnose authentication and database issues. Follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Check if you are logged in (Auth Status)</li>
          <li>Verify if database tables exist (Database Tables)</li>
          <li>Check if your profile exists in the profiles table</li>
          <li>If your profile doesn't exist, click "Create Profile"</li>
          <li>To become an admin, click "Make Admin"</li>
        </ol>
      </div>
    </div>
  );
} 