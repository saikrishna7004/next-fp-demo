import getPost from "@/lib/getPost";
import Link from "next/link";
import Comments from "@/app/components/Comments";
import PostClient from "@/app/components/PostClient";

export default async function Post({ params }) {
    const post = await getPost(params.id);

    if (!post) return <p>Post not found</p>;

    return (
        <div className="min-h-screen container mx-auto mt-8">
            <Link href='/' className="mb-8 text-blue-500">Back to Home</Link>
            <article className="mt-4">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-sm text-gray-600 mb-4">{post.author} - {new Date(post.date).toLocaleDateString()}</p>
                <div className="prose mb-4">
                    {post.content}
                </div>
                <div className="mt-4">
                    {post?.tags?.map(tag => (
                        <span key={tag} className="tag mr-2">{tag}</span>
                    ))}
                </div>
                <PostClient postId={params.id} />
                <Comments postId={params.id} comments={[]} />
            </article>
        </div>
    );
}
