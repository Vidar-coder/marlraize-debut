import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Jonna Lynne D. Capacete", //Noenyl Bryle M. Gonzaga
    brideNickname: "Jonna", //Ltryl
    groom: "Ricky A. Balila II", //Ltryl B. Benitez
    groomNickname: "Ricky",
    debut: "Marlriaze Shane Omilig",
    debutNickname: "Marlriaze",
    monogram:"/monogram/monogram-new.png" ,//Ltryl
    backgroundMusic:"/background_music/Enchanted (Taylor Swift Cover) by Joseph William Morgan [Bridgerton Season 4 (Netflix Series)].mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSeaYh_rrEOISitwgsO55nts-oxQQldXDNgmh5Z3Uw-ICFxr1Q/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbwnCgxqJPuhjMjqSdRijfzoI5BMKQoFl7ENdSstWf6W8daFlKUZ611elhbEloeJKbb9/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbz0LSR-gJzvgpAAMKj-f1cob1PBfOcCv1xdnO2pjAEMEYboqEBJSuOQ3V2cXbl9ak34Gg/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbxzmHN7CyUHxDcKoN7QMuOhmFrUyK4qJ9PK7V59u7j_bE7_pGg4G7Mb3c8XuI5Y4GoOvA/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbxlIS8hDnCh-LfTe4xHC3uK3FM-QpoOrR8Xb82X2TM4fFiKAlylXUKdkpBp3KsdO5_crQ/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbwQlJWbJ9TTcyIMJ0qulCJNRhZddoTYJfoFHqwXhtuHWLzB7-b8pHhQcmI1XpIEvIdj1Q/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbwIUDKMoMIHVwbmr6KbgmBtlGRpMGj1Z9maeHSEwsFaXNi0dAH8WYhqbtiAfg_p5D4lgw/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycby4btF7AjwAlZBgtJuT-UiMq2qn7xjhv6p-qZb4pXEcY1Q7J_FdfNKFxLv-Bumbuah_6Q/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/18fYvffWYDluHqEXchTuzD4pxUEcxeml8Ev77a1Z4-ok/edit?usp=sharing",
    videoMessageForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSfeGlEl4CMXWefdvCw6AOPHFS1ROku_rs-Gbofa2LkVJ0sLGQ/viewform", 
  },
  wedding: {
    date: "October 10, 2026",
    time: "5:00 PM",
    venue: "Smallville 21 Hotel",
    tagline: "are getting married!!!!!",
    theme: "Enchanted FairyTale",
    motif: "#FFCA8B, #FFB383, #F6CEC8, #E99997, #C8C29E",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "October 19, 2026",
      coordinator: "Jonna / Ricky",
      phone: "to be announced",
    },
  },
  contact: {
    bridePhone: "to be announced",
    groomPhone: "to be announced",
    email: "to be announced",
  },
  giftRegistry: {
    QR_1:{
    id: "BPI",
    src: "/QR/BPI.png",
    label: "BPI",
    accountNumber: "KAMS : ***********569",
    },
    QR_2:{
    id: "MariBank",
    src: "/QR/MariBank.png",
    label: "MariBank",
    accountNumber: "****7672",
    }
    // ,
    // QR_3:{
    // id: "Gcash",
    // src: "/QR/pleaseProvideQR.png",
    // label: "Gcash",
    // accountNumber: "to be announced",
    // }
  },
  ceremony: {
    location: "Smallville 21 Hotel",
    venue: "Smallville Complex G. T, Glicerio Pison Ave, Mandurriao, Iloilo City",
    map: "https://maps.app.goo.gl/Z1LCEXWvzHVdGjgF9",
    date: "November 19, 2026",
    day: "Thursday",
    time: "9:30 AM",
    entourageTime: "8:00 AM",
    guestsTime: "9:00 AM",
    image: ["/Details/venue.png", "/Details/venue2.png"],
  },
  reception: {
    location: "Smallville 21 Hotel",
    venue: "Smallville Complex G. T, Glicerio Pison Ave, Mandurriao, Iloilo City",
    map: "https://maps.app.goo.gl/Z1LCEXWvzHVdGjgF9",
    date: "November 19, 2026",
    day: "Thursday",
    time: "12:00 noon",
    image: ["/Details/venue.png", "/Details/venue2.png"],
  },
  dressCode: {
    theme: "Enchanted FairyTale",
    sponsors: {
      title: "Sponsors",
      ninang: {
        label: "Ninang",
        description: "Long gown in the shade of silver gray.",
        image: "/Details/Ninang.png",
        palette: ["#D8D3CD", "#C0C0C0", "#A9A9A9", "#969090", "#8C8686"],
      },
      ninong: {
        label: "Ninong",
        description: "Barong Tagalog and black slacks.",
        image: "/Details/Ninong.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    entourage: {
      title: "Entourage",
      bridesmaid: {
        label: "Bridesmaids",
        description: "Long gown that suits our color motif.",
        image: "/Details/bridesmaid.png",
        palette: ["#B4A3D4", "#C8A2C8"],
      },
      groomsmen: {
        label: "Groomsmen",
        description: "Long sleeve Barong Tagalog and black slacks.",
        image: "/Details/Groomsmen.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    guests: {
      title: "Guests",
      label: "Guests",
      description: "Enchanted FairyTale formal attire.",
      image: "/Details/Guest.png",
      palette: ["#FFCA8B", "#FFB383", "#F6CEC8", "#E99997", "#C8C29E"],
    },
    paletteNote:
      "Our theme is Enchanted FairyTale. Ladies: a floor-length gown in peach, yellow, pink, lavender, or light blue. Gentlemen: a black formal suit.",
    closing:
      "Thank you for helping bring her debut vision to life. We can't wait to celebrate with you!",
    note: "We kindly request our guests to dress in attire following our Enchanted FairyTale palette.",
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "Paul and Ana Wedding",
    embedUrl:
    //https://open.spotify.com/embed/playlist/2AhKS56CXqBWMYYNrnWrsR?utm_source=generator&si=2beaa29421e94943
      "https://open.spotify.com/embed/playlist/2AhKS56CXqBWMYYNrnWrsR?utm_source=generator&theme=0&si=2beaa29421e94943",
    spotifyUrl: "https://open.spotify.com/playlist/2AhKS56CXqBWMYYNrnWrsR",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1ifWA2ACXALYfObrfRzHJRHcDRrIDkYgh?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#MarlriazeAtEighteen"],
    instructions:
      "Kindly scan this QR code and upload the photos and videos from her debut. She would be delighted to see your snaps, too.",
  },
  accommodation: {
    coordinator: {
      name: "Jonna / Ricky",
      phone: "to be announced",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}
