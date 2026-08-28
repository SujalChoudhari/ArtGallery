export type ArtPiece = {
    id: number;
    slug: string;
    title: string;
    image: string;
    isFeatured?: boolean;
    featuredOrder?: number;
    thoughts?: string;
};

const artPieces: ArtPiece[] = [
    {
        id: 1,
        slug: "the-terminus",
        title: "The Terminus",
        image: "/drawings/01_Chhatrapati_Shivaji_Terminus.jpg",
        isFeatured: true,
        featuredOrder: 18,
        thoughts: "School days. A building so grand it made a kid pick up a pencil and try. Every arch, every tower, every gothic detail felt like a challenge. I didn't know then that this was the beginning of something. I just wanted to get it right.",
    },
    {
        id: 2,
        slug: "ultron-s-gaze",
        title: "Ultron's Gaze",
        image: "/drawings/02_Detailed_Robot_Head_Study.jpg",
    },
    {
        id: 3,
        slug: "venice-one-point",
        title: "Venice, One Point",
        image: "/drawings/03_Venice_Canal_Perspective.jpg",
    },
    {
        id: 4,
        slug: "autumn-s-grin",
        title: "Autumn's Grin",
        image: "/drawings/04_Classic_Jack_O_Lantern.jpg",
    },
    {
        id: 5,
        slug: "crimson-bloom",
        title: "Crimson Bloom",
        image: "/drawings/05_Vibrant_Red_Hibiscus.jpg",
    },
    {
        id: 6,
        slug: "horns-darkness",
        title: "Horns & Darkness",
        image: "/drawings/06_Horned_Skull_With_Keys.jpg",
        isFeatured: true,
        featuredOrder: 15,
        thoughts: "2020. The dark had a language of horns and tangled lines, ornate and a little dangerous. I followed it until the page showed me there was still a way toward light.",
    },
    {
        id: 7,
        slug: "rising-from-soil",
        title: "Rising from Soil",
        image: "/drawings/07_Reaching_Zombie_Hand.jpg",
    },
    {
        id: 8,
        slug: "my-father",
        title: "My Father",
        image: "/drawings/08_Portrait_Man_With_Beard.jpg",
    },
    {
        id: 9,
        slug: "trakula-erupts",
        title: "Trakula Erupts",
        image: "/drawings/09_Volcano_Eruption_Silhouette.jpg",
    },
    {
        id: 10,
        slug: "the-little-star-flower",
        title: "The Little Star Flower",
        image: "/drawings/10_Delicate_Pink_Star_Flower.jpg",
    },
    {
        id: 11,
        slug: "pen-on-paper-2019",
        title: "Pen on Paper, 2019",
        image: "/drawings/11_Detailed_Pen_Sketch.jpg",
    },
    {
        id: 12,
        slug: "my-mother",
        title: "My Mother",
        image: "/drawings/12_Portrait_Woman_With_Glasses.jpg",
    },
    {
        id: 13,
        slug: "my-sister-smiling",
        title: "My Sister, Smiling",
        image: "/drawings/13_Smiling_Woman_Portrait_Sketch.jpg",
    },
    {
        id: 14,
        slug: "the-weight-of-thinking",
        title: "The Weight of Thinking",
        image: "/drawings/14_Skull_With_Flowing_Tentacles.jpg",
        isFeatured: true,
        featuredOrder: 2,
        thoughts: "2018. The noise in my head grew heavy, pressing against the inside of the skull. I found another language and let its clean lines carry some of the weight.",
    },
    {
        id: 15,
        slug: "out-of-the-dark",
        title: "Out of the Dark",
        image: "/drawings/15_Train_Emerging_From_Tunnel.jpg",
        isFeatured: true,
        featuredOrder: 3,
        thoughts: "2020. The train came out carrying the mud of the tunnel, not clean, not finished, but moving. I couldn't see the light yet, though I had begun to trust it was there.",
    },
    {
        id: 16,
        slug: "a-brush-made-by-a-brush",
        title: "A Brush Made by a Brush",
        image: "/drawings/16_Realistic_Paintbrush_Study.jpg",
    },
    {
        id: 17,
        slug: "when-we-held-on",
        title: "When We Held On",
        image: "/drawings/17_Clasped_Hands_Gesture.jpg",
        isFeatured: true,
        featuredOrder: 16,
        thoughts: "2018. Two people holding hands. The third image in the hand series, and the warmest one. I drew what I felt. Wanting to be close, wanting it to last.",
    },
    {
        id: 18,
        slug: "don-t-go",
        title: "Don't Go",
        image: "/drawings/18_Shaded_Reaching_Hand_Study.jpg",
        isFeatured: true,
        featuredOrder: 17,
        thoughts: "2018. A hand reaches into the space where something is already leaving. It was never about possession, only the quiet wish to keep a moment from becoming a distance.",
    },
    {
        id: 19,
        slug: "solitude",
        title: "Solitude",
        image: "/drawings/19_Charminar_Sketch_Hyderabad.jpg",
        isFeatured: true,
        featuredOrder: 4,
        thoughts: "Late 2025. After a long silence, I returned to the pencil and found the ruins still standing. In their solitude, I recognized the shape of something that had not disappeared.",
    },
    {
        id: 20,
        slug: "outside-the-box",
        title: "Outside the Box",
        image: "/drawings/20_Gateway_Of_India_Sketch_Mumbai.jpg",
    },
    {
        id: 21,
        slug: "tic-tac-3d",
        title: "Tic-Tac, 3D",
        image: "/drawings/21_Tic_Tac_Mixers_Still_Life.jpg",
    },
    {
        id: 22,
        slug: "a-boat-a-lighthouse",
        title: "A Boat, A Lighthouse",
        image: "/drawings/22_Misty_Lake_And_Solitary_Boat.jpg",
    },
    {
        id: 23,
        slug: "deer-at-night",
        title: "Deer at Night",
        image: "/drawings/23_Nocturnal_Forest_With_Deer_Silhouette.jpg",
    },
    {
        id: 24,
        slug: "warli-practice",
        title: "Warli Practice",
        image: "/drawings/24_Traditional_Warli_Folk_Art.jpg",
    },
    {
        id: 25,
        slug: "galaxy-from-a-spray-can",
        title: "Galaxy from a Spray Can",
        image: "/drawings/25_Cosmic_View_Galaxy_And_Planets.jpg",
    },
    {
        id: 26,
        slug: "collision-course",
        title: "Collision Course",
        image: "/drawings/26_Celestial_Collision_Colorful_Space_Art.jpg",
    },
    {
        id: 27,
        slug: "the-road-between-trees",
        title: "The Road Between Trees",
        image: "/drawings/27_Perspective_Path_Lined_With_Trees.jpg",
    },
    {
        id: 28,
        slug: "bridge-sketch",
        title: "Bridge Sketch",
        image: "/drawings/28_Lakeside_Dock_Pencil_Landscape.jpg",
    },
    {
        id: 29,
        slug: "same-bridge-in-color",
        title: "Same Bridge, in Color",
        image: "/drawings/29_Lakeside_Dock_Watercolor_Landscape.jpg",
    },
    {
        id: 30,
        slug: "the-lake-in-winter",
        title: "The Lake in Winter",
        image: "/drawings/30_Winter_Lake_And_Bare_Trees.jpg",
    },
    {
        id: 31,
        slug: "i-am-iron-man",
        title: "I Am Iron Man",
        image: "/drawings/31_Iron_Man_Iconic_Quote.jpg",
    },
    {
        id: 32,
        slug: "i-can-do-this-all-day",
        title: "I Can Do This All Day",
        image: "/drawings/32_Captain_America_Endurance_Quote.jpg",
    },
    {
        id: 33,
        slug: "god-of-thunder",
        title: "God of Thunder",
        image: "/drawings/33_Thor_God_Of_Thunder_Quote.jpg",
    },
    {
        id: 34,
        slug: "pointy-waves",
        title: "Pointy Waves",
        image: "/drawings/34_Stormy_Seas_And_Boat_Sketch.jpg",
    },
    {
        id: 35,
        slug: "shading-a-coconut",
        title: "Shading a Coconut",
        image: "/drawings/35_Assorted_Vegetables_And_Fruit_Study.jpg",
    },
    {
        id: 36,
        slug: "she-had-glasses",
        title: "She Had Glasses",
        image: "/drawings/36_Woman_With_Sunglasses_Profile_Sketch.jpg",
        isFeatured: true,
        featuredOrder: 12,
        thoughts: "College era. Some portraits are made by hiding the face behind a veil. The lenses were a disguise, and the blank spaces carried what I couldn't put on paper.",
    },
    {
        id: 37,
        slug: "spirals-in-black",
        title: "Spirals in Black",
        image: "/drawings/37_Abstract_Noire_Et_Blanc_Spirals.jpg",
    },
    {
        id: 38,
        slug: "eagle-abstract",
        title: "Eagle, Abstract",
        image: "/drawings/38_Patriotic_Eagle_Star_Composition.jpg",
    },
    {
        id: 39,
        slug: "color-grid-experiment",
        title: "Color Grid Experiment",
        image: "/drawings/39_Primary_Color_Conundrum.jpg",
    },
    {
        id: 40,
        slug: "geometric-fragments",
        title: "Geometric Fragments",
        image: "/drawings/40_Fragmented_Rainbow_Shards.jpg",
    },
    {
        id: 41,
        slug: "a-saree-pattern",
        title: "A Saree Pattern",
        image: "/drawings/41_Ornate_Teal_Textile_Pattern.jpg",
    },
    {
        id: 42,
        slug: "violet-mandala",
        title: "Violet Mandala",
        image: "/drawings/42_Purple_And_Gold_Floral_Mandala.jpg",
    },
    {
        id: 43,
        slug: "warm-butterfly-bloom",
        title: "Warm Butterfly Bloom",
        image: "/drawings/43_Symmetrical_Butterfly_Bloom_Mandala.jpg",
    },
    {
        id: 44,
        slug: "decorative-fan",
        title: "Decorative Fan",
        image: "/drawings/44_Decorative_Hand_Fan_Floral_Design.jpg",
    },
    {
        id: 45,
        slug: "the-lamp",
        title: "The Lamp",
        image: "/drawings/45_Aquatic_Floral_Lampshade_Fantasy.jpg",
    },
    {
        id: 46,
        slug: "a-bad-one",
        title: "A Bad One",
        image: "/drawings/46_Tribal_Inspired_Fish_Graphic.jpg",
    },
    {
        id: 47,
        slug: "cat-watching-the-blast",
        title: "Cat Watching the Blast",
        image: "/drawings/47_Moonlit_Silhouette_Cat_On_Fence.jpg",
    },
    {
        id: 48,
        slug: "when-i-was-happy",
        title: "When I Was Happy",
        image: "/drawings/48_Pensive_Man_In_Blue_Watercolor.jpg",
        isFeatured: true,
        featuredOrder: 11,
        thoughts: "Late 2025. Color returned to the page without asking permission. I took it as a small, unexpected sign that joy was finding its way back.",
    },
    {
        id: 49,
        slug: "bamboo-wreath",
        title: "Bamboo Wreath",
        image: "/drawings/49_Bamboo_And_Leaf_Handicraft_Wreath.jpg",
    },
    {
        id: 50,
        slug: "color-chaos",
        title: "Color Chaos",
        image: "/drawings/50_Impasto_Chromatic_Explosion.jpg",
    },
    {
        id: 51,
        slug: "tropical-tee-design",
        title: "Tropical Tee Design",
        image: "/drawings/51_Tropical_Island_Beach_TShirt_Art.jpg",
    },
    {
        id: 52,
        slug: "everything-in-the-sky",
        title: "Everything in the Sky",
        image: "/drawings/52_Journey_Through_The_Skies_And_Space.jpg",
    },
    {
        id: 53,
        slug: "save-farmers",
        title: "Save Farmers",
        image: "/drawings/53_Farmers_Life_Illustrated_Typography.jpg",
    },
    {
        id: 54,
        slug: "lines-lines",
        title: "Lines & Lines",
        image: "/drawings/54_Street_Scene_Covid_Sanitization_Effort.jpg",
    },
    {
        id: 55,
        slug: "practice-sketch",
        title: "Practice Sketch",
        image: "/drawings/55_Vibrant_Indian_Railway_Station_Scene.jpg",
    },
    {
        id: 56,
        slug: "covid-era",
        title: "Covid Era",
        image: "/drawings/56_Optical_Gradient_Chevron_Waves.jpg",
    },
    {
        id: 57,
        slug: "me-the-sunflower",
        title: "Me & the Sunflower",
        image: "/drawings/57_Daydreaming_In_A_Sunflower_Field.jpg",
    },
    {
        id: 58,
        slug: "holi",
        title: "Holi",
        image: "/drawings/58_Joyful_Holi_Festival_Colors.jpg",
    },
    {
        id: 59,
        slug: "school-era-abstract",
        title: "School Era Abstract",
        image: "/drawings/59_Abstract_Carnival_Of_Shapes.jpg",
    },
    {
        id: 60,
        slug: "vibrance-of-the-tunes",
        title: "Vibrance Of The Tunes",
        image: "/drawings/60_Psychedelic_Soundwaves_Aura.jpg",
        isFeatured: true,
        featuredOrder: 7,
        thoughts: "Music doesn't just play. It lifts something. A quiet confidence, a sudden warmth. This is what the rhythm and melody look like from the inside.",
    },
    {
        id: 61,
        slug: "school-abstract",
        title: "School Abstract",
        image: "/drawings/61_Fluid_Forms_Of_Rainbow_Creature.jpg",
    },
    {
        id: 62,
        slug: "sunflower-dish",
        title: "Sunflower Dish",
        image: "/drawings/62_Sunflower_And_Vine_Roundel_Design.jpg",
    },
    {
        id: 63,
        slug: "save-trees",
        title: "Save Trees",
        image: "/drawings/63_Eco_Message_Against_Deforestation_Art.jpg",
    },
    {
        id: 64,
        slug: "rain-lamplight",
        title: "Rain & Lamplight",
        image: "/drawings/64_Girl_in_rain_Wet_lamp_post.jpg",
        isFeatured: true,
        featuredOrder: 19,
        thoughts: "Mid 2024. Rain makes the world honest. Beside one small pool of warmth, standing still becomes its own kind of bravery.",
    },
    {
        id: 65,
        slug: "now-it-s-a-memory",
        title: "Now It's A Memory",
        image: "/drawings/65_Women_Closeup.jpg",
        isFeatured: true,
        featuredOrder: 6,
        thoughts: "Late 2025. A face can remain long after the distance has settled in. I couldn't reproduce it exactly, only get close enough to remember what it felt like.",
    },
    {
        id: 66,
        slug: "nana-patekar",
        title: "Nana Patekar",
        image: "/drawings/66_Nana.jpg",
    },
    {
        id: 67,
        slug: "vari-nighali-pandhari",
        title: "Vari Nighali Pandhari",
        image: "/drawings/67_Vari_nighali_pandhari.jpg",
    },
    {
        id: 68,
        slug: "bappa-buffed",
        title: "Bappa, Buffed",
        image: "/drawings/68_Ganpati_Bappa_morya.jpg",
        isFeatured: true,
        featuredOrder: 8,
        thoughts: "The best drawing I think I have ever made. Ganpati Bappa, but not the gentle serene version. This one is powerful. Every muscle deliberate. I wanted to draw divinity the way strength actually feels.",
    },
    {
        id: 69,
        slug: "self-portrait",
        title: "Self Portrait",
        image: "/drawings/69_Self_Portrait.jpg",
        isFeatured: true,
        featuredOrder: 21,
        thoughts: "Late 2025. I looked back and found more than the wreckage I expected. The code, the words, and the simple act of staying had given shape to a self I could finally recognize.",
    },
    {
        id: 70,
        slug: "infinity-castle",
        title: "Infinity Castle",
        image: "/drawings/70_Infinity_Castle.jpg",
        isFeatured: true,
        featuredOrder: 10,
        thoughts: "Late 2025. I was deep into Demon Slayer. The Infinity Castle obsessed me. The geometry, the impossible angles, the sense of falling forever. I spent a long time on the details. Tanjiro mid-fall, corridors going nowhere.",
    },
    {
        id: 71,
        slug: "glowing-eyes",
        title: "Glowing Eyes",
        image: "/drawings/71_Her_Eyes.jpg",
        isFeatured: true,
        featuredOrder: 1,
        thoughts: "This is where the light began. A pair of eyes held a warmth I could not name, and every later line seems to lead back to that glow.",
    },
    {
        id: 72,
        slug: "kanheri-in-warli",
        title: "Kanheri, in Warli",
        image: "/drawings/72_Kanheri_Warli_Cave_Painting.jpg",
        isFeatured: true,
        featuredOrder: 9,
        thoughts: "The Kanheri caves in SGNP, drawn in the style of Warli. Trees, pillars, floors, walls, all in that ancient tribal language of lines. The image you see here is inverted. The original was black on white, but the negative feels more honest. Like looking at a photograph of something that happened a long time ago.",
    },
    {
        id: 73,
        slug: "krishna-lifts-govardhan",
        title: "Krishna Lifts Govardhan",
        image: "/drawings/73_Govardhan_Parvat.jpg",
        isFeatured: true,
        featuredOrder: 13,
        thoughts: "Madhubani style. A folk art language that turns myth into geometry. Krishna lifting an entire mountain. The style demanded patience; every fill, every border had its own rhythm.",
    },
    {
        id: 74,
        slug: "vasudev",
        title: "Vasudev",
        image: "/drawings/74_Vasu_Dev.jpg",
        isFeatured: true,
        featuredOrder: 14,
        thoughts: "Made for Maharashtra Din. Vasudev, the wandering folk performer, bells in hand, a living tradition. Something about drawing him felt like an act of preservation.",
    },
    {
        id: 75,
        slug: "shivaji-maharaj",
        title: "Shivaji Maharaj",
        image: "/drawings/75_Shivaji_Maharaj.jpg",
        isFeatured: true,
        featuredOrder: 20,
        thoughts: "A portrait on a hundred. Chhatrapati Shivaji Maharaj deserved more than a quick sketch. I wanted to get the weight of him right, the sharpness in the eyes, the quiet authority. Some subjects demand your full attention. This was one of them.",
    },
    {
        id: 76,
        slug: "duality-me-vs-i",
        title: "Duality: Me vs I",
        image: "/drawings/76_Split.jpg",
        isFeatured: true,
        featuredOrder: 5,
        thoughts: "2026. To the world, I can look like a machine built only for use. Behind the keys, a warmer, more unruly life keeps moving, mostly unseen.",
    },
    {
        id: 77,
        slug: "the-dark-lily",
        title: "The Dark Lily",
        image: "/drawings/77_The_Dark_Lily.jpg",
        isFeatured: true,
        featuredOrder: 22,
        thoughts: "2026. We only ever frame the bright days. The low ones get buried, like they don't count. They do. The downs are worth sitting with too.",
    },
    {
        id: 78,
        slug: "after-the-fall",
        title: "After the Fall",
        image: "/drawings/78_After_the_Fall.jpg",
        isFeatured: true,
        featuredOrder: 23,
        thoughts: "2026. I wanted to paint the moment after surrender, when the thing you built is burning and you finally stop trying to save it. Somehow, the end still feels like freedom.",
    },
    {
        id: 79,
        slug: "oranges",
        title: "Oranges",
        image: "/drawings/79_Oranges.jpg",
        thoughts: "Aug 2026. A season can end without taking the whole tree with it. New color gathers on the branches where the old leaves fell, and sooner or later, something is ready for flight.",
    },
    {
        id: 80,
        slug: "a-quiet-brightness",
        title: "A Quiet Brightness",
        image: "/drawings/80_A_Quiet_Brightness.jpg",
    },
    {
        id: 81,
        slug: "the-display",
        title: "The Display",
        image: "/drawings/81_The_Display.jpg",
        thoughts: "2026. After watching Silo, I felt like drawing what might be on the other side of the display. Something green, open, and still worth walking toward.",
    },
    {
        id: 82,
        slug: "didi",
        title: "Didi",
        image: "/drawings/82_Didi.jpg",
    },
];

export const allArtPieces = artPieces;

export const featuredArtPieces = [...artPieces]
    .filter((piece) => piece.isFeatured)
    .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER));

export const chronologicalArtPieces = [...artPieces].sort((a, b) => b.id - a.id);

export const latestArtPieces = [...chronologicalArtPieces].sort((a, b) => {
    const thoughtsFirst = Number(Boolean(b.thoughts)) - Number(Boolean(a.thoughts));
    return thoughtsFirst || b.id - a.id;
});

export function getArtPieceBySlug(slug: string) {
    return artPieces.find((piece) => piece.slug === slug);
}

export function getAdjacentArtPieces(slug: string) {
    const index = latestArtPieces.findIndex((piece) => piece.slug === slug);

    if (index === -1) {
        return { previous: undefined, next: undefined };
    }

    return {
        previous: latestArtPieces[index - 1],
        next: latestArtPieces[index + 1],
    };
}

export function getLatestArtPieces(limit: number, excludeSlug?: string) {
    return chronologicalArtPieces.filter((piece) => piece.slug !== excludeSlug).slice(0, limit);
}

export default artPieces;