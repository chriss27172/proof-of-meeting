'use client';

import { useEffect } from 'react';

const APP_ID = '695a94c34d3a403912ed8cf0';

/**
 * Component to add base:app_id meta tag directly to document head
 * This ensures the meta tag is available for Base App verification
 * 
 * Base App requires the metatag in the <head> element for ownership verification.
 * This component adds it both via inline script (immediate) and useEffect (after React loads).
 */
export default function BaseAppMeta() {
  useEffect(() => {
    // Add base:app_id meta tag directly to head immediately
    // Base App may look for it by both 'name' and 'property' attributes
    if (typeof document !== 'undefined') {
      // Add meta tag with 'name' attribute (standard HTML meta tag)
      let metaTagByName = document.querySelector('meta[name="base:app_id"]');
      if (!metaTagByName) {
        metaTagByName = document.createElement('meta');
        metaTagByName.setAttribute('name', 'base:app_id');
        metaTagByName.setAttribute('content', APP_ID);
        // Insert at the beginning of head for early detection
        document.head.insertBefore(metaTagByName, document.head.firstChild);
        console.log('✅ base:app_id meta tag (name) added to head via useEffect');
      } else {
        metaTagByName.setAttribute('content', APP_ID);
        console.log('✅ base:app_id meta tag (name) already exists, updated');
      }
      
      // Also add with 'property' attribute (Open Graph style, some systems use this)
      let metaTagByProperty = document.querySelector('meta[property="base:app_id"]');
      if (!metaTagByProperty) {
        metaTagByProperty = document.createElement('meta');
        metaTagByProperty.setAttribute('property', 'base:app_id');
        metaTagByProperty.setAttribute('content', APP_ID);
        document.head.appendChild(metaTagByProperty);
        console.log('✅ base:app_id meta tag (property) added to head via useEffect');
      } else {
        metaTagByProperty.setAttribute('content', APP_ID);
        console.log('✅ base:app_id meta tag (property) already exists, updated');
      }
      
      // Verify the tag is in the DOM
      const verifyTag = document.querySelector('meta[name="base:app_id"]');
      if (verifyTag) {
        console.log('✅ Verified: base:app_id meta tag is in DOM:', {
          name: verifyTag.getAttribute('name'),
          content: verifyTag.getAttribute('content'),
        });
      } else {
        console.error('❌ Error: base:app_id meta tag not found in DOM after adding');
      }
    }
  }, []);

  // Add via inline script that executes immediately (before React/JavaScript fully loads)
  // This ensures the tag is in the HTML <head> even before JavaScript executes
  // This is critical for Base App verification which may check the tag early
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (typeof document !== 'undefined' && document.head) {
              const appId = '${APP_ID}';
              // Check if meta tag already exists
              let meta = document.querySelector('meta[name="base:app_id"]');
              if (!meta) {
                // Create and add meta tag to head
                meta = document.createElement('meta');
                meta.setAttribute('name', 'base:app_id');
                meta.setAttribute('content', appId);
                // Insert at the beginning of head for earliest possible detection
                if (document.head.firstChild) {
                  document.head.insertBefore(meta, document.head.firstChild);
                } else {
                  document.head.appendChild(meta);
                }
                console.log('✅ base:app_id meta tag added to <head> via inline script');
              } else {
                // Update content if tag exists
                meta.setAttribute('content', appId);
                console.log('✅ base:app_id meta tag already exists in <head>, content updated');
              }
            }
          })();
        `,
      }}
    />
  );
}

