"use client";

import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border border-gray-200 rounded-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-bold hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <section className="p-4 pt-0 border-t border-gray-200">
          {children}
        </section>
      )}
    </section>
  );
}
