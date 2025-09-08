"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";


export default function AllProjects() {
  const clientProjects = data.filter((d) => d.category === 'Client Projects');
  const mainProjects = data.filter((d) => d.category !== 'Client Projects');

  const mainCards = mainProjects.map((card, index) => (
    <Card key={card.title} card={card} index={index} layout={true} />
  ));
  const clientCards = clientProjects.map((card, index) => (
    <Card key={card.title} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full pt-8 space-y-10">
      <div>
        <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          My Projects
        </h2>
        <Carousel items={mainCards} />
      </div>
      {clientCards.length > 0 && (
        <div>
          <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Client Projects
          </h2>
          <Carousel items={clientCards} />
        </div>
      )}
    </div>
  );
}
