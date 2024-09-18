'use client';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OnboardingStep from './OnboardingStep';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface InstallStepProps {
  title: string;
  description: string;
  disabled?: boolean;
}

const SNIPPET = `<script>
        var analyticsId = 'SURFACE_TAG_ID';
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            'analytics.start': new Date().getTime(),
            event: 'analytics.js'
          });
          var f = d.getElementsByTagName(s)[0],
            j1 = d.createElement(s),
            j2 = d.createElement(s),
            j3 = d.createElement(s),
            j4 = d.createElement(s),
            dl = l != 'analytics' ? '&l=' + l : '';

            j1.async = true;
            j1.src = 'https://unpkg.com/analytics/dist/analytics.min.js';
            j1.onload = function() {
                j2.async = true;
                j2.src = 'https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js';
                j2.onload = function() {
                    j3.async = true;
                    j3.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js';
                    j3.onload = function() {
                        j4.async = true;
                        j4.src = '/analytics.js' + dl;
                        f.parentNode.insertBefore(j4, f);
                    };
                    f.parentNode.insertBefore(j3, f);
                };
                f.parentNode.insertBefore(j2, f);
            };
            f.parentNode.insertBefore(j1, f);
        })(window, document, 'script', 'analytics', analyticsId);
    </script>`;

const InstallStep: React.FC<InstallStepProps> = ({ title, description, disabled = true }) => {
  const [surfaceTagId, setSurfaceTagId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSurfaceTagId = async () => {
      let uniqueKey = localStorage.getItem('uniqueKey');
      if (!uniqueKey) {
        uniqueKey = uuidv4() as string;
        localStorage.setItem('uniqueKey', uniqueKey);
      }
      setSurfaceTagId(uniqueKey);
    };
    fetchSurfaceTagId();
  }, []);

  const handleTestConnection = async () => {
    if (!surfaceTagId) return;

    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:3002/api/test-connection?tag=${encodeURIComponent(String(surfaceTagId))}`);
        let tag = localStorage.getItem('uniqueKey') || '';
        if (response.data.success) {
            setTestResult({ success: true, message: 'Connected successfully!' });
            localStorage.setItem(tag, 'connected');
        } else {
            setTestResult({ success: false, message: 'We couldn’t detect the Surface Tag on your website. Please ensure the snippet is added correctly. ' });
            localStorage.setItem(tag, 'failed');
        }
        window.location.reload();
    } catch (error) {
      setTestResult({ success: false, message: 'An error occurred while testing the connection.' });
    } finally {
      setLoading(false);
    }
  };

  const generateSnippet = (tagId: string) => SNIPPET.replace('SURFACE_TAG_ID', tagId);

  const snippet = surfaceTagId ? generateSnippet(surfaceTagId) : 'Loading...';

  return (
    <OnboardingStep title={title} description={description} type="install" disabled={disabled} uniqueKey={surfaceTagId || ''}>
      <div>
        <div className="flex flex-wrap gap-2 p-5 mt-6 w-full rounded-xl border-2 border-solid bg-stone-50 border-zinc-200 shadow-[0px_2px_4px_rgba(27,28,29,0.04)] max-md:max-w-full">
          <SyntaxHighlighter
            language="javascript"
            style={solarizedlight}
            className="flex-1 shrink text-base tracking-wider leading-5 basis-6 text-zinc-600 max-md:max-w-full"
            customStyle={{ backgroundColor: 'inherit' }}
          >
            {snippet}
          </SyntaxHighlighter>
          <button onClick={() => navigator.clipboard.writeText(snippet)} className={`${disabled ? 'opacity-50 cursor-not-allowed bg-gray-40 text-black' : 'text-white'} gap-2 px-4 py-1 text-sm font-semibold tracking-normal leading-loose bg-blue-600 rounded-lg max-h-9 flex items-center hover:bg-blue-700 active:bg-blue-800`}>            
                <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                    <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                </svg>
                <p className={`${disabled ? 'text-gray-500':'text-white'}`}>Copy</p>
            </span>
        </button>
        </div>
        {
            !testResult && loading && (
                <div className={`mt-4 p-4 rounded-lg bg-blue-100 text-blue-800`}>
                    Testing connection...
                </div>
            )
        }
        {testResult && (
          <div className={`mt-4 p-4 rounded-lg ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {testResult.message}
          </div>
        )}
        <div className="flex gap-3 items-center mt-6 w-full text-sm font-semibold tracking-normal leading-loose text-white max-md:max-w-full justify-end">
          <button
            onClick={handleTestConnection}
            disabled={disabled || loading}
            className={`${disabled ? 'opacity-50 cursor-not-allowed bg-gray-40 text-black' : 'text-white'} gap-2 px-4 py-1 text-sm font-semibold tracking-normal leading-loose bg-blue-600 rounded-lg max-h-9 flex items-center hover:bg-blue-700 active:bg-blue-800`}>            
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>
      </div>
    </OnboardingStep>
  );
};

export default InstallStep;