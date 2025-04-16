'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

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
    const fileNames = await fs.readdir(postsDirectory);
    const allPostsData = await Promise.all(
        fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(async fileName => {
                const id = fileName.replace(/\.md$/, '');
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = await fs.readFile(fullPath, 'utf8');
                const matterResult = matter(fileContents);
                
                const contentLines = matterResult.content.split('\n');
                let language = 'English';
                
                for (const line of contentLines) {
                    if (line.startsWith('Language:')) {
                        language = line.replace('Language:', '').trim();
                        break;
                    }
                }

                return {
                    id,
                    language,
                    ...matterResult.data as { title: string; date: string; description: string }
                };
            })
    );
        
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(id: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const contentLines = matterResult.content.split('\n');
    let language = 'English';
    
    for (const line of contentLines) {
        if (line.startsWith('Language:')) {
            language = line.replace('Language:', '').trim();
            break;
        }
    }

    let content = matterResult.content;
    content = content.replace(/!\[(.*?)\]\((blog-images\/.*?)\)/g, '![$1](/$2)');

    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        language,
        ...matterResult.data as { title: string; date: string; description: string }
    };
}

export async function getAllPostIds() {
    const fileNames = await fs.readdir(postsDirectory);
    
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            return {
                params: {
                    id: fileName.replace(/\.md$/, '')
                }
            };
        });
}
