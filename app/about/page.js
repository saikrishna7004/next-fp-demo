import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8 sm:p-20">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p>Welcome to the Simple Blog Platform. We aim to provide insightful articles on various topics.</p>
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Simple Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
