'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Project, Achievement, BlogPost, CreativeHighlight } from '@/types';
import toast from 'react-hot-toast';

type ContentType = 'project' | 'achievement' | 'blog' | 'creative';

export default function AdminDashboard() {
  const [contentType, setContentType] = useState<ContentType>('project');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form states for different content types
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'technical',
    links: {
      github: '',
      live: '',
      youtube: '',
    },
    techStack: '',
  });
  
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let certificateUrl = '';
      if (file) {
        const storageRef = ref(storage, `certificates/${file.name}`);
        await uploadBytes(storageRef, file);
        certificateUrl = await getDownloadURL(storageRef);
      }

      const baseData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      switch (contentType) {
        case 'project':
          await addDoc(collection(db, 'projects'), {
            ...baseData,
            techStack: formData.techStack.split(',').map(tech => tech.trim()),
            links: {
              github: formData.links.github,
              live: formData.links.live,
              youtube: formData.links.youtube,
            },
            certificateUrl,
          });
          break;
          
        case 'achievement':
          await addDoc(collection(db, 'achievements'), {
            ...baseData,
            date: Timestamp.now(),
            certificateUrl,
          });
          break;
          
        // Add other content type handlers
      }

      toast.success('Content added successfully!');
      setFormData({
        title: '',
        description: '',
        type: 'technical',
        links: {
          github: '',
          live: '',
          youtube: '',
        },
        techStack: '',
      });
      setFile(null);
    } catch (error) {
      toast.error('Error adding content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => auth.signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            {(['project', 'achievement', 'blog', 'creative'] as ContentType[]).map((type) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`px-4 py-2 rounded ${
                  contentType === type
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                required
              />
            </div>

            <div>
              <label className="text-white">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="text-white">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'technical' | 'creative' })}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
              >
                <option value="technical">Technical</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            {contentType === 'project' && (
              <>
                <div>
                  <label className="text-white">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-white">GitHub Link</label>
                  <input
                    type="url"
                    value={formData.links.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      links: { ...formData.links, github: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-white">Live Demo Link</label>
                  <input
                    type="url"
                    value={formData.links.live}
                    onChange={(e) => setFormData({
                      ...formData,
                      links: { ...formData.links, live: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-white">YouTube Link</label>
                  <input
                    type="url"
                    value={formData.links.youtube}
                    onChange={(e) => setFormData({
                      ...formData,
                      links: { ...formData.links, youtube: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-white">Certificate/Media Upload</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Content'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}