import BlogEditor from "@/app/components/BlogEditor";

export default function CreatePost() {
    return (
        <div className="min-h-screen container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-4">Create New Post</h1>
            <BlogEditor />
        </div>
    );
}
