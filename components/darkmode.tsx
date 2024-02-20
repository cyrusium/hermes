"use client";
import { useEffect, useState } from 'react'

export default function DarkMode() {
  const [enabled, setEnabled] = useState<boolean>(
    typeof localStorage === 'undefined' ? true :
      (localStorage.getItem('dark-mode') !== null ?
        JSON.parse(
          localStorage.getItem('dark-mode')
          ?? 'null' satisfies string | null) as boolean | null
        ?? document.documentElement.classList.contains('dark')
        : true
      )
  );
  useEffect(() => {
    console.log(enabled ? 'Enabling dark mode' : 'Disabling dark mode')
    if (enabled) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('dark-mode', 'true')
    }
    if (!enabled) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('dark-mode', 'false')
    }
  }, [enabled])

  return (
    <div className="translate-y-3 mr-6 max-md:translate-y-3 max-md::mr-3">
      <button
        onClick={() => setEnabled(e => !e)}
      >
        <span className="sr-only">Use Dark Mode</span>
        {enabled ?
          <svg className='aspect-1 w-6 -translate-y-2 dark:fill-text-200' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d="M479.882-374q43.701 0 75.91-31.049Q588-436.098 588-479.882q0-43.701-32.091-75.91Q523.819-588 480.118-588q-43.701 0-74.91 32.091Q374-523.819 374-480.118q0 43.701 31.049 74.91Q436.098-374 479.882-374Zm.051 92q-82.067 0-140-57.933Q282-397.866 282-479.933 282-562 339.933-620.5q57.933-58.5 140-58.5Q562-679 620.5-620.5 679-562 679-479.933q0 82.067-58.5 140Q562-282 479.933-282ZM216-435H25v-91h191v91Zm720 0H745v-91h191v91ZM435-745v-191h91v191h-91Zm0 720v-191h91v191h-91ZM261-636 140-754l65-67 119 120-63 65Zm496 496L635-261l64-64 121 117-63 68ZM636-700l118-120 67 63-119 122-66-65ZM140-204l120-122 65 65-117 121-68-64Zm340-276Z" />
          </svg>
          : <svg className='aspect-1 w-6 -translate-y-2 dark:fill-text-200' xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d="M479.588-111q-155.358 0-261.973-106.85Q111-324.701 111-480.059t106.833-263.149Q324.667-851 480-851q6.707 0 13.854.5Q501-850 514-849q-29 36-44 78.5T455-682q0 96.417 66.083 162.208Q587.167-454 683-454q46.891 0 89.946-13Q816-480 851-507q-1 11.975-.5 17.195.5 5.22.5 8.72 0 155.168-108.277 262.627Q634.446-111 479.588-111Zm.412-91q90 0 160-53t91-126q-19 8-42.167 11.5Q665.667-366 645-367q-109.612-13-186.806-88.486Q381-530.973 367-647q-1-15.333 2-36.667Q372-705 382-734q-79 30-129.5 100.5T202-480q0 117.086 80.457 197.543Q362.914-202 480-202Zm-13-266Z" />
          </svg>
        }
      </button>
    </div>
  )
}