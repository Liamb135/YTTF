// ==UserScript==
// @name         YT Thumbnail Fixer
// @namespace    https://github.com/Liamb135
// @version      1.7
// @description  Easily adjust number of thumbnails on each row.
// @match        *://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://github.com/Liamb135/YTTF/raw/main/YTTF.user.js
// @updateURL    https://github.com/Liamb135/YTTF/raw/main/YTTF.user.js
// ==/UserScript==

(function() {
    'use strict';

    // User configuration
    const VIDEOS_PER_ROW = 10; // Change this number to set thumbnails per row.
    const ADJUST_CHANNEL_PAGES = false; // Set to true to apply grid adjustment on Channel pages.

    function applyGridStyle() {
        const path = window.location.pathname;

        const isChannelPage = path.startsWith('/channel/') || path.startsWith('/c/') || path.startsWith('/user/') || path.startsWith('/@');

        if (isChannelPage && !ADJUST_CHANNEL_PAGES) {
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
            ytd-rich-grid-renderer {
                --ytd-rich-grid-items-per-row: ${VIDEOS_PER_ROW} !important;
            }

            ytd-rich-grid-row, #contents.ytd-rich-grid-row {
                display: contents !important;
            }
        `;
        document.head.appendChild(style);
    }

    applyGridStyle();

    const observer = new MutationObserver(() => {
        applyGridStyle();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
