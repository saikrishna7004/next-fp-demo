import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8 sm:p-20">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us at contact@simpleblogplatform.com.</p>
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Simple Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
