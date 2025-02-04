import BlogEditor from "@/app/components/BlogEditor";
import getPost from "@/lib/getPost";

export default async function EditPost({ params }) {
    const post = await getPost(params.id);

    if (!post) return <p>Post not found</p>;

    return (
        <div className="min-h-screen container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-4">Edit Post</h1>
            <BlogEditor post={post} />
        </div>
    );
}
