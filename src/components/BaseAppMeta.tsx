'use client';

import { useEffect } from 'react';

const APP_ID = '695a94c34d3a403912ed8cf0';

/**
 * Component to add base:app_id meta tag directly to document head
 * This ensures the meta tag is available for Base App verification
 * 
 * Base App may check for the meta tag before JavaScript loads,
 * so we add it immediately when component mounts
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
        console.log('✅ base:app_id meta tag (name) added to head');
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
        console.log('✅ base:app_id meta tag (property) added to head');
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

  // Also add via dangerouslySetInnerHTML as a fallback for immediate rendering
  // This ensures the tag is in the HTML even before JavaScript executes
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            if (typeof document !== 'undefined') {
              const appId = '${APP_ID}';
              let meta = document.querySelector('meta[name="base:app_id"]');
              if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', 'base:app_id');
                meta.setAttribute('content', appId);
                document.head.insertBefore(meta, document.head.firstChild);
              }
            }
          })();
        `,
      }}
    />
  );
}

