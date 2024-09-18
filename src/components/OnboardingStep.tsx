'use client';

import React, { useEffect, useState } from 'react';

interface OnboardingStepProps {
  title: string;
  description: string;
  type: string;
  uniqueKey: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ title, description, type, uniqueKey, disabled=true, children }) => {
  const [stepCta, setStepCta] = useState(true);
  const [status, setStatus] = useState('');

  const getStatusIcon = (status: string) => {
    if(type === 'test') {
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="gray" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>; 
    } 
    if (status === 'connected') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90EE90" className="size-6">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
      );
    } else if (status === 'failed') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFB6C1" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    ;
    }
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem(uniqueKey) || '';
    setStatus(storedStatus);
  }, [uniqueKey, status]);

  return (
    <section className="flex flex-col justify-center p-6 w-full bg-white rounded-lg border border-solid border-slate-200 shadow-[0px_4px_13px_rgba(0,0,0,0.042)] max-md:max-w-full mb-8">
      <header className="flex flex-wrap gap-4 items-center w-full max-md:max-w-full">
        {getStatusIcon(status)}
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
          <h2 className="text-lg font-medium tracking-normal leading-none text-black max-md:max-w-full">
            {title}
          </h2>
          <p className="mt-4 text-base tracking-wider leading-none text-zinc-600 max-md:max-w-full">
            {description}
          </p>
        </div>
        <div>
        <button onClick={()=>{!disabled && setStepCta(!stepCta)}} className={`${disabled ? 'opacity-50 cursor-not-allowed bg-gray-40 text-black' : 'text-white'} gap-2 px-4 py-1 text-sm font-semibold tracking-normal leading-loose bg-blue-600 rounded-lg max-h-9 flex items-center hover:bg-blue-700 active:bg-blue-800`}>            
                <span className="flex items-center gap-2">
                  {stepCta && (type === 'install' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                   : 
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                   )}
                  {!stepCta && 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  }
                <p className={`${disabled ? 'text-gray-500':'text-white'}`}>
                  {stepCta && (type === 'install' ? 'Install tag' : 'Test tag')}
                  {!stepCta && 'Close'}
                </p>
            </span>
        </button>
          
        </div>
      </header>
      <div hidden={stepCta}>
        {children}
      </div>
    </section>
  );
};

export default OnboardingStep;