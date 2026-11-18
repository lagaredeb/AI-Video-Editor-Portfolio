/* =============================================================
   YOUR PORTFOLIO VIDEOS
   -------------------------------------------------------------
   This is the only file you need to edit to add or remove videos.

   ADD a video:    copy one line { ... }, paste it under it, and
                   change the link (and style / vertical if needed).
   REMOVE a video: delete its whole line.
   REORDER:        move lines up or down. The top one shows first.

   style:    claymation, lego, pixar, realistic, or singing
   link:     the Google Drive link of the video
             (Drive: right-click the video > Share > Copy link)
   vertical: true  = tall video (Reels / TikTok, 9:16)
             false = wide video (YouTube, 16:9)

   Every line must end with a comma ,
   ============================================================= */

var VIDEOS = [
  // ----- CLAYMATION -----
  { style: "claymation", vertical: false, link: "https://drive.google.com/file/d/1s62Z7mvwquiXvtKcQ0IawGcyiO_63ykg/view?usp=drive_link" },

  // ----- LEGO -----
  { style: "lego", vertical: false, link: "https://drive.google.com/file/d/1eu29cqQ8TshOxu22AApUpilNbLQtRJKG/view?usp=drive_link" },

  // ----- PIXAR ANIMATION -----
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1Czw8Uf4A8dZuw3UiiGrU0hbcwbL1lLM3/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/11-y-mpuvfUCflwUZHi3-qLne2of80kRu/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/12z9S_q4WWsdLyvbz2EJkcLO4nsxvlc05/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1GIMpuX_YZmLIseUc1lABc2n1K6eHCGWj/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1A3UJ-TKxv1fso3zILg_-aGALAYu4tMI-/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/14ppj2E1PtoVxH-16TSrNkvvv94LYPwBc/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1ofiAmadgYbkSsWMBUc-Y58svcurhcWk9/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1A3UJ-TKxv1fso3zILg_-aGALAYu4tMI-/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1SLgf3yRLf_LUrbSLc2Wrd1KvAj4Ic-3r/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1qTab61_AYqP3fGLMe5EgDj4n9ZgduHHA/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1tRAwLOHOUzaqycRsHqHO5FnnSB0h9vIp/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1cAycdu8Jfh07HNmMDg3CB3ycQFvRgH6i/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1Pb9XhbAAWigyNyYORtXYq2PfSE8oMfqn/view?usp=drive_link" },
  { style: "pixar", vertical: false, link: "https://drive.google.com/file/d/1cTNJpSydVKUBpJzaNaNxlkf8QZVFwDP1/view?usp=drive_link" },

  // ----- REALISTIC ADS -----
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/1gM5kPIkf5vY8yypsDrRNt4pf6wVp5bHN/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/1hNTbcn7mBM2iokxFnAhADxxHmSG56uL3/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/10MaYsx2poxZAhMrq5H4Ad0fXHBaYqh9F/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/1l0fHNqMQLX7cGoPxHu0CyPz_YKRFA9vB/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/1eikkCGubpuN4v-IhL8BLCeIkux4aearL/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/1ERyf2lDzn3M5h2sq8eASFGmscOqg-ZtV/view?usp=drive_link" },
  { style: "realistic", vertical: false, link: "https://drive.google.com/file/d/15lFGxR2yU0LxTPjBipnPUhETuIbz4BeR/view?usp=drive_link" },

  // ----- SINGING ADS -----
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1cWIS1-m3yu0nkc1Z3OQhHx3KA3fztxYP/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1qEiAYu-Trm6MejhSEdNjGAmbVLyt6sTl/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1EfvLq3rhP_U1ipTm9z62JFVoIRrb91b6/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1-tmnlgtXE7_GQ1NrQ8IVZeShLJbE4-K_/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1EJMtdYE1sLDQ6f4GF1F93RlVRxQu0tBs/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1ns1VNL8OuYMnacS03g1vitM4T1Ej3YMa/view?usp=drive_link" }, 
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1H4VvpwRt2xBVLmd9Vzs490d7LvmtuI4T/view?usp=drive_link" },
  { style: "singing", vertical: false, link: "https://drive.google.com/file/d/1wM3h2n2zWCKqXCySN-XOfU_tTJKSSGB0/view?usp=drive_link" },

];
