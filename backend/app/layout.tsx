import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FICPACT API',
  description: 'Backend API for FICPACT - A competitive programming & learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>FICPACT Backend API</h1>
          <p>Welcome to the FICPACT backend API server.</p>
          <h2>Available Endpoints:</h2>
          <ul>
            <li><strong>POST</strong> /api/auth/register - Register new user</li>
            <li><strong>POST</strong> /api/auth/login - Login user</li>
            <li><strong>GET</strong> /api/auth/me - Get current user (requires token)</li>
            <li><strong>POST</strong> /api/auth/logout - Logout user</li>
            <li><strong>GET</strong> /api/users/[id] - Get user profile</li>
            <li><strong>PUT</strong> /api/users/[id] - Update user profile (requires token)</li>
            <li><strong>GET</strong> /api/users/[id]/progress - Get user progress</li>
            <li><strong>GET</strong> /api/chapters - Get all chapters</li>
            <li><strong>GET</strong> /api/chapters/[id] - Get chapter details</li>
            <li><strong>POST</strong> /api/chapters/[id]/submit - Submit solution (requires token)</li>
            <li><strong>GET</strong> /api/daily-cases - Get today's challenge</li>
            <li><strong>POST</strong> /api/daily-cases/[id]/submit - Submit daily case (requires token)</li>
            <li><strong>GET</strong> /api/coins/shop - Get shop items</li>
            <li><strong>POST</strong> /api/coins/shop/[id]/purchase - Purchase item (requires token)</li>
            <li><strong>GET</strong> /api/community/posts - Get community posts</li>
            <li><strong>POST</strong> /api/community/posts - Create post (requires token)</li>
            <li><strong>POST</strong> /api/community/posts/[id]/comments - Add comment (requires token)</li>
            <li><strong>GET</strong> /api/leaderboard - Get leaderboard</li>
            <li><strong>GET</strong> /api/leaderboard/weekly - Get weekly leaderboard</li>
          </ul>
          <h3>Setup Instructions:</h3>
          <ol>
            <li>Run: npm install</li>
            <li>Run: npx prisma migrate dev --name init</li>
            <li>Run: npx prisma db seed</li>
            <li>Run: npm run dev</li>
          </ol>
          {children}
        </div>
      </body>
    </html>
  );
}
