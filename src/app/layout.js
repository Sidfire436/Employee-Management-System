import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Employee Management',
  description: 'Employee Management System',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <nav className="bg-black text-white py-4 px-5 flex justify-between items-center">
            <h3 className='text-xl'>Employee Management System</h3>
          </nav>
          <div className='flex'>
            <div className='h-screen bg-black text-white w-[15vw] text-2xl'>
              <ul className='pt-5 flex flex-col gap-8 px-3'>
                <Link href="/">Employee</Link>
                <Link href="/add-employee">Add Employee</Link>
              </ul>
            </div>
            <div className='p-4 w-full max-w-screen-xl mx-auto'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
