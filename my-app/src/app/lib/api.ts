'use server';

import { supabaseClient } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export type PostListItem = {
    id: string;
    title: string;
    date: string;
    description: string;
    language?: string;
};

export type PostData = PostListItem & {
    contentHtml: string;
};

export async function getSortedPostsData(): Promise<PostListItem[]> {
    const { data: posts, error } = await supabaseClient
        .from('posts')
        .select('id, title, date, description, language')
        .eq('is_published', true)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching sorted posts data:', error);
        return [];
    }

    if (!posts) {
        return [];
    }

    return posts.map(post => ({
        id: post.id,
        title: post.title,
        date: post.date,
        description: post.description,
        language: post.language || 'English',
    }));
}

export async function getPostData(id: string): Promise<PostData | null> {
    const { data: post, error } = await supabaseClient
        .from('posts')
        .select('id, title, date, description, language, content_md')
        .eq('id', id)
        .eq('is_published', true)
        .single();

    if (error || !post) {
        console.error('Error fetching post data for id:', id, error);
        return null;
    }

    let contentMarkdown = post.content_md || '';
    contentMarkdown = contentMarkdown.replace(/!\[(.*?)\]\((blog-images\/.*?)\)/g, '![$1](/$2)');

    const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(contentMarkdown);
    const contentHtml = processedContent.toString();

    return {
        id: post.id,
        title: post.title,
        date: post.date,
        description: post.description,
        language: post.language || 'English',
        contentHtml,
    };
}

export async function getAllPostIds() {
    const { data: posts, error } = await supabaseClient
        .from('posts')
        .select('id')
        .eq('is_published', true);

    if (error || !posts) {
        console.error('Error fetching all post ids:', error);
        return [];
    }
    
    return posts.map(post => {
        return {
            params: {
                id: post.id,
            },
        };
    });
}
