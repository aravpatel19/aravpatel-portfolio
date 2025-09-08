'use client';

import React from 'react';
import Image from 'next/image';

const Crazy = () => {
  return (
    <div className="mx-auto w-full space-y-8">
      <div className="space-y-2">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          Adventures & Fun
        </h2>
        <p className="text-neutral-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Skiing the Matterhorn, exploring Morocco, and more.</p>
      </div>

      {/* Responsive gallery */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Matterhorn */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/arav-images/matterhorn-picture.png"
            alt="Matterhorn — Zermatt, Switzerland"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
          <div className="bg-black/40 absolute inset-x-0 bottom-0 p-3 text-sm text-white">
            Matterhorn — Zermatt, Switzerland
          </div>
        </div>

        {/* Morocco */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/arav-images/morocco-picture.png"
            alt="Travel in Morocco"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
          <div className="bg-black/40 absolute inset-x-0 bottom-0 p-3 text-sm text-white">
            Exploring Morocco
          </div>
        </div>
      </div>

      {/* Video embeds */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Video</h3>
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/vKzPM40Oyo4?si=foVMUiYL5T8x7tdr"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Crazy;