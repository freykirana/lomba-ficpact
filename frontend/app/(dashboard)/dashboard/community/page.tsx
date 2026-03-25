"use client";

import { useState, useEffect } from "react";
import { Users, MessageSquare, Loader2, Plus, X } from "lucide-react";
import { communityAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string;
  upvotes: number;
  commentCount: number;
  author: {
    id: string;
    username: string;
    avatar: string | null;
  };
  createdAt: string;
}

const CATEGORIES = ["DISCUSSION", "TUTORIAL", "SHARING", "HELP"];

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("DISCUSSION");
  const [submitting, setSubmitting] = useState(false);
  
  // Interactive UI states
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchPosts = () => {
    setLoading(true);
    communityAPI
      .getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;
    setSubmitting(true);
    try {
      await communityAPI.createPost(formTitle, formContent, formCategory);
      setShowForm(false);
      setFormTitle("");
      setFormContent("");
      fetchPosts();
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await communityAPI.likePost(postId);
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, upvotes: p.upvotes + (res.liked ? 1 : -1) } 
          : p
      ));
    } catch {
      // Ignore
    }
  };

  const toggleComments = async (postId: string) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
      return;
    }
    setExpandedPost(postId);
    try {
      const data = await communityAPI.getComments(postId);
      setExpandedComments(data);
    } catch {
      setExpandedComments([]);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!newComment.trim()) return;
    try {
      await communityAPI.addComment(postId, newComment);
      setNewComment("");
      const data = await communityAPI.getComments(postId);
      setExpandedComments(data);
      setPosts(posts.map(p => p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Share knowledge, discuss cases, and learn together.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {/* Create Post Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full text-lg font-semibold border-0 bg-transparent outline-none placeholder:text-gray-400"
          />
          <textarea
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            placeholder="Write your post content (markdown supported)..."
            rows={5}
            className="w-full border border-gray-200 rounded-xl bg-gray-50 p-4 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    formCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={submitting || !formTitle.trim() || !formContent.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Publish
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-400" size={32} />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <MessageSquare className="text-gray-300 mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-medium">No posts yet.</p>
          <p className="text-gray-400 text-sm mt-1">Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">{post.author.username[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{post.author.username}</span>
                    <span className="text-xs text-gray-400">{timeAgo(post.createdAt)}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">{post.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-full"
                    >
                      <span>👍</span> {post.upvotes}
                    </button>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className={`flex items-center gap-1.5 transition px-3 py-1.5 rounded-full ${expandedPost === post.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      <MessageSquare size={14} /> {post.commentCount} comments
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                      {expandedComments.length > 0 ? (
                        expandedComments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                              {comment.author.username[0]?.toUpperCase()}
                            </div>
                            <div className="bg-gray-50 rounded-2xl rounded-tl-none p-3 text-sm flex-1">
                              <span className="font-bold text-gray-900 block mb-0.5">{comment.author.username}</span>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 text-center py-2">No comments here yet. Be the first!</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <input 
                          type="text" 
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                          placeholder="Write a comment..." 
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          disabled={!newComment.trim()}
                          className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-bold shadow-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
