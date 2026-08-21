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
        thoughts: "2020. Depression has its own aesthetic. Dark, ornate, a little dangerous. A skull crowned with horns and tentacles. I didn't plan it. It just came out of wherever I was.",
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
        thoughts: "This is the last drawing I made before I turned to programming to escape my own mind. Those aren't tentacles, they're the heavy weight of overthinking, cracking the skull from the inside. This was 2018, at its lowest.",
    },
    {
        id: 15,
        slug: "out-of-the-dark",
        title: "Out of the Dark",
        image: "/drawings/15_Train_Emerging_From_Tunnel.jpg",
        isFeatured: true,
        featuredOrder: 3,
        thoughts: "An old, muddy train pushing through the dark. That was me in 2020. I was still feeling down, not fully healed, but I was actively hoping things would get better. I was slowly but surely moving towards the light",
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
        thoughts: "Same era, different feeling. A hand stretched out. Not reaching for something, but trying to stop something from leaving. It was never a relationship. Just a crush. Maybe a first love. The simplest drawing with the strangest story.",
    },
    {
        id: 19,
        slug: "solitude",
        title: "Solitude",
        image: "/drawings/19_Charminar_Sketch_Hyderabad.jpg",
        isFeatured: true,
        featuredOrder: 4,
        thoughts: "Late 2025. I picked up the pencil again after years away. The church in Vasai Fort wasn't a subject. It was a mirror. Ruins still standing. Solitary but still there. That's what I was drawing.",
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
        thoughts: "College era. I was still in that familiar fog. A different person this time, not the first love, but real enough. The glasses aren't a detail. They're a disguise. I painted her without painting her.",
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
        thoughts: "Late 2025. Small drawing. Has color. That's how I knew things were different. I actually wanted color in life. I made this in a moment of pure, unexpected happiness.",
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
        thoughts: "Mid 2024. Rain has a way of making everything feel more honest. She's standing in it, not running from it. The lamp beside her is the only warm thing in the frame. There's something quietly brave about someone who lets themselves get rained on.",
    },
    {
        id: 65,
        slug: "now-it-s-a-memory",
        title: "Now It's A Memory",
        image: "/drawings/65_Women_Closeup.jpg",
        isFeatured: true,
        featuredOrder: 6,
        thoughts: "Made in late 2025, but the memory of her. This is what she looked like. Not exactly. I can't replicate something that felt like that. But this is close enough to make me remember.",
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
        thoughts: "Late 2025. Still Alive. Lost in love, sure. But somewhere along the way I built something. I coded, I wrote, I grew. This is me looking back at all of it and deciding I'm not too bad after all.",
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
        thoughts: "This is where it started. A close-up of the eyes that made me fall in love. The absolute glow and warmth they carried. I still remember the exact moment I first saw them. This drawing is that moment. Everything else in this collection exists in the shadow of this one.",
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
        thoughts: "2026. To the world I am an emotionless machine. An utility, a tool. They choose to ignore the person behind the keyboard. That person is far more vibrant than what people see.",
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
        thoughts: "Aug 2026. Some seasons are meant to be left behind. What emerges from them is brighter, more beautiful, and finally ready to take flight.",
    },
    {
        id: 80,
        title: "A Quiet Brightness",
        image: "/drawings/80_A_Quiet_Brightness.jpg",
    } as ArtPiece,
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