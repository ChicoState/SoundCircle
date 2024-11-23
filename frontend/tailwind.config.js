/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        periwinkle: '#b3c2f2ff',
        slateBlue: '#735cddff',
        mauveine: '#9000b3ff',
        purple: '#7e007bff',
        blackBean: '#37000aff',
        RoyalBlue: '#5a67d8ff',
        
        // Main Colors
        main_Background: '#E5E5E5',

        // Header
        header_Light: '#452763',
        header_Dark: '#362145',
        header_ButtonLight: '#4E2767',
        header_ButtonDark: '#23132C',
        header_Shadow: 'rgba(0, 0, 0, 0.15)',
        header_TextColor: '#FFFFFF',

        // Search bar
        searchbar_Background: '#FFFFFF',
        searchbar_HoverBackground: '#FFFFFF',
        searchbar_PlaceholderText: '#818181',
        searchbar_IconColor: '#383838',

        // Posts
        post_bgColor: '#FFFFFF',
        post_username: '#000000',
        post_userid: '#727272',
        post_mainText: '#000000',
        post_likeText: '#000000',
        post_likeColorFull: "#FF4646",
        post_likeColorEmpty: '#727272',
        post_replyButton: '#727272',

        // Search
        search_filterButtonSelected: '#4E2767',
        search_filterButtonHovered: '#7951A2',
        search_textSelected: '#FFFFFF',
        search_textHovered: '#FFFFFF',
        search_textDefault: '#727272',
        search_pageTextColorMain: '#000000',

        // Universal Widgets
        widget_spinnerMain: '#452763',
        widget_spinnerBG: '#aaaaaa',
        widget_spinnerHighlight: '#e7e7e7',
      },
    },
  },
  plugins: [],
}