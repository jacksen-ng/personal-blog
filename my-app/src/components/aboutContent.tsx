"use client"
import React from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiGooglecloud, SiTypescript } from 'react-icons/si'

const techStack = [
    { icon: <SiReact />, name: "React", description: "Frontend Library" },
    { icon: <SiNextdotjs />, name: "Next.js", description: "React Framework" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", description: "CSS Framework" },
    { icon: <SiGooglecloud />, name: "Google Cloud", description: "Cloud Platform" },
    { icon: <SiTypescript/>, name:"TypeScript", description:"Programming Language"}
]

export default function AboutContent() {
    return (
        <div className="container mx-auto px-4 pt-28 md:pt-16 pb-12">
            {/* Introduction Section */}
            <section className="mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center 
                    bg-gradient-to-r from-violet-500 to-indigo-500 
                    dark:from-violet-300 dark:to-indigo-300 
                    bg-clip-text text-transparent">
                    About Me
                </h1>
                
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl text-center
                        text-zinc-600 dark:text-zinc-300
                        opacity-0 animate-fade-in [animation-delay:200ms]">
                        I&apos;m a Malaysian which is currently studying in Tokyo, Japan. This blog
                        is a place where I share my thoughts, ideas, and experiences. In this blog,
                        I will share my learning journey, my thoughts on technology, and my life in Japan.
                    </p>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center 
                    bg-gradient-to-r from-violet-500 to-indigo-500 
                    dark:from-violet-300 dark:to-indigo-300 
                    bg-clip-text text-transparent">
                    Blog&apos;s Tech Stack
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {techStack.map((tech, index) => (
                        <div key={tech.name} 
                            className="flex flex-col items-center p-6 rounded-lg
                                bg-white dark:bg-zinc-800 shadow-lg
                                opacity-0 animate-fade-in"
                            style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                            <div className="text-4xl mb-4 text-violet-500">
                                {tech.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-center">
                                {tech.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}