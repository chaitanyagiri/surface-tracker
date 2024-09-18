"use client";

import React, { useEffect, useState } from 'react';
import OnboardingStep from './OnboardingStep';

interface Event {
    type: string;
    visitor: string;
    metadata: string;
    createdAt: string;
}

interface TestStepProps {
  title: string;
  description: string;
  disabled?: boolean;
  events?: Event[];
}

const TestStep: React.FC<TestStepProps> = ({ title, description, disabled=true }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events?tag=${localStorage.getItem('uniqueKey')}`); // Replace with your API endpoint
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Initial fetch
    const intervalId = setInterval(fetchEvents, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <OnboardingStep title={title} description={description} type="test" disabled={disabled} uniqueKey=''>
      <div>
        <div className="flex overflow-hidden flex-wrap items-start mt-6 w-full text-base font-medium leading-none text-gray-500 bg-white rounded-lg border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col grow shrink whitespace-nowrap w-[108px]">
            <div className="flex-1 shrink gap-2 self-stretch px-3 py-3.5 w-full bg-white border-b border-gray-200 min-h-[44px] text-zinc-900">
              Event
            </div>
            {events.map((event, index) => (
              <div key={index} className="self-stretch px-3 py-4 w-full border-b border-gray-200 min-h-[52px]">
                {event.type}
              </div>
            ))}
          </div>
          <div className="flex overflow-hidden flex-col grow shrink whitespace-nowrap min-w-[240px] w-[238px]">
            <div className="flex-1 shrink gap-2 self-stretch px-3 py-3.5 w-full bg-white border-b border-gray-200 min-h-[44px] text-zinc-900">
              Visitor
            </div>
            {events.map((event, index) => (
              <div key={index} className="self-stretch py-4 pl-3 w-full border-b border-gray-200 min-h-[52px]">
                {event.visitor}
              </div>
            ))}
          </div>
          <div className="flex overflow-hidden flex-col grow shrink min-w-[240px] w-[389px]">
            <div className="flex-1 shrink gap-2 self-stretch px-3 py-3.5 w-full whitespace-nowrap bg-white border-b border-gray-200 min-h-[44px] text-zinc-900">
              Metadata
            </div>
            {events.map((event, index) => (
              <div key={index} className="self-stretch px-3 py-4 w-full border-b border-gray-200 min-h-[52px]">
                {event.metadata}
              </div>
            ))}
          </div>
          <div className="flex flex-col grow shrink w-[184px]">
            <div className="flex-1 shrink gap-2 self-stretch px-3 py-3.5 w-full bg-white border-b border-gray-200 min-h-[44px] text-zinc-900">
              Created at
            </div>
            {events.map((event, index) => (
              <div key={index} className="self-stretch px-3 py-4 w-full border-b border-gray-200 min-h-[52px]">
                {new Date(event.createdAt).toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </OnboardingStep>
  );
};

export default TestStep;