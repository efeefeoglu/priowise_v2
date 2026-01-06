'use client';

import React, { useState, KeyboardEvent, useEffect } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder = 'Add a tag...' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      setTags(value.split(',').map((t) => t.trim()).filter(Boolean));
    } else {
      setTags([]);
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        onChange(newTags.join(','));
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Optional: remove last tag on backspace if input is empty
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange(newTags.join(','));
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags.join(','));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-brand-yellow/50 focus-within:border-brand-yellow">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-brand-yellow/20 text-yellow-800 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-yellow-900 focus:outline-none"
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 outline-none min-w-[120px] text-sm bg-transparent"
      />
    </div>
  );
}
