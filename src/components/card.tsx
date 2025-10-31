'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  type: 'technical' | 'creative';
  links?: {
    github?: string;
    live?: string;
    youtube?: string;
    other?: string[];
  };
  certificateUrl?: string;
  techStack?: string[];
  imageUrl?: string;
}

export function Card({
  title,
  description,
  type,
  links,
  certificateUrl,
  techStack,
  imageUrl,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradientClass = type === 'technical'
    ? 'from-blue-500 to-purple-600'
    : 'from-orange-500 to-pink-600';

  return (
    <motion.div
      layoutId={title}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative overflow-hidden rounded-lg bg-gray-900 p-6 cursor-pointer
        hover:ring-2 ring-offset-2 ring-offset-gray-900 transition-all
        ${type === 'technical' ? 'ring-blue-500' : 'ring-orange-500'}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {imageUrl && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h3 className={`text-xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-2`}>
        {title}
      </h3>

      <p className="text-gray-300 mb-4">
        {isExpanded ? description : `${description.slice(0, 100)}...`}
      </p>

      {techStack && (
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        {links?.github && (
          <Link
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub →
          </Link>
        )}
        {links?.live && (
          <Link
            href={links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo →
          </Link>
        )}
        {links?.youtube && (
          <Link
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Watch Video →
          </Link>
        )}
        {certificateUrl && (
          <Link
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            View Certificate →
          </Link>
        )}
      </div>
    </motion.div>
  );
}