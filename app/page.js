import { getPosts } from "../lib/posts";
import HomeClient from "./HomeClient";
import Navbar from "./components/Navbar";

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto mt-8">
                <HomeClient posts={posts} />
            </main>
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 Simple Blog Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
