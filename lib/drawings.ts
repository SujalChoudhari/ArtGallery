const artPieces = [
    {
        id: 1,
        title: "Grandeur of Terminus",
        image: "/drawings/01_Chhatrapati_Shivaji_Terminus.jpg",
    },
    {
        id: 2,
        title: "Mechanized Intellect",
        image: "/drawings/02_Detailed_Robot_Head_Study.jpg",
    },
    {
        id: 3,
        title: "Venetian Reflections",
        image: "/drawings/03_Venice_Canal_Perspective.jpg",
    },
    {
        id: 4,
        title: "Autumn's Smile",
        image: "/drawings/04_Classic_Jack_O_Lantern.jpg",
    },
    {
        id: 5,
        title: "Crimson Bloom",
        image: "/drawings/05_Vibrant_Red_Hibiscus.jpg",
    },
    {
        id: 6,
        title: "Guardian of Keys",
        image: "/drawings/06_Horned_Skull_With_Keys.jpg",
    },
    {
        id: 7,
        title: "Undying Grasp",
        image: "/drawings/07_Reaching_Zombie_Hand.jpg",
    },
    {
        id: 8,
        title: "Man of Contemplation",
        image: "/drawings/08_Portrait_Man_With_Beard.jpg",
    },
    {
        id: 9,
        title: "Volcanic Ascent",
        image: "/drawings/09_Volcano_Eruption_Silhouette.jpg",
    },
    {
        id: 10,
        title: "Star Blossom",
        image: "/drawings/10_Delicate_Pink_Star_Flower.jpg",
    },
    {
        id: 11,
        title: "Intricate Whispers",
        image: "/drawings/11_Detailed_Pen_Sketch.jpg",
    },
    {
        id: 12,
        title: "Insightful Gaze",
        image: "/drawings/12_Portrait_Woman_With_Glasses.jpg",
    },
    {
        id: 13,
        title: "Joyful Expression",
        image: "/drawings/13_Smiling_Woman_Portrait_Sketch.jpg",
    },
    {
        id: 14,
        title: "Tentacled Grin",
        image: "/drawings/14_Skull_With_Flowing_Tentacles.jpg",
    },
    {
        id: 15,
        title: "Train Emerging From Tunnel",
        image: "/drawings/15_Train_Emerging_From_Tunnel.jpg",
    },
    {
        id: 16,
        title: "Painter's Companion",
        image: "/drawings/16_Realistic_Paintbrush_Study.jpg",
    },
    {
        id: 17,
        title: "Hands United",
        image: "/drawings/17_Clasped_Hands_Gesture.jpg",
    },
    {
        id: 18,
        title: "Extended Reach",
        image: "/drawings/18_Shaded_Reaching_Hand_Study.jpg",
    },
    {
        id: 19,
        title: "Charminar's Majesty",
        image: "/drawings/19_Charminar_Sketch_Hyderabad.jpg",
    },
    {
        id: 20,
        title: "Gateway to Mumbai",
        image: "/drawings/20_Gateway_Of_India_Sketch_Mumbai.jpg",
    },
    {
        id: 21,
        title: "Sweet Distractions",
        image: "/drawings/21_Tic_Tac_Mixers_Still_Life.jpg",
    },
    {
        id: 22,
        title: "Misty Morn's Embrace",
        image: "/drawings/22_Misty_Lake_And_Solitary_Boat.jpg",
    },
    {
        id: 23,
        title: "Forest Nocturne",
        image: "/drawings/23_Nocturnal_Forest_With_Deer_Silhouette.jpg",
    },
    {
        id: 24,
        title: "Warli Village Life",
        image: "/drawings/24_Traditional_Warli_Folk_Art.jpg",
    },
    {
        id: 25,
        title: "Celestial Canvas",
        image: "/drawings/25_Cosmic_View_Galaxy_And_Planets.jpg",
    },
    {
        id: 26,
        title: "Cosmic Kaleidoscope",
        image: "/drawings/26_Celestial_Collision_Colorful_Space_Art.jpg",
    },
    {
        id: 27,
        title: "Emerald Pathway",
        image: "/drawings/27_Perspective_Path_Lined_With_Trees.jpg",
    },
    {
        id: 28,
        title: "Lakeside Calm in Graphite",
        image: "/drawings/28_Lakeside_Dock_Pencil_Landscape.jpg",
    },
    {
        id: 29,
        title: "Azure Waters Edge",
        image: "/drawings/29_Lakeside_Dock_Watercolor_Landscape.jpg",
    },
    {
        id: 30,
        title: "Winter's Stillness",
        image: "/drawings/30_Winter_Lake_And_Bare_Trees.jpg",
    },
    {
        id: 31,
        title: "Armored Resolve",
        image: "/drawings/31_Iron_Man_Iconic_Quote.jpg",
    },
    {
        id: 32,
        title: "Shield of Strength",
        image: "/drawings/32_Captain_America_Endurance_Quote.jpg",
    },
    {
        id: 33,
        title: "Asgardian Might",
        image: "/drawings/33_Thor_God_Of_Thunder_Quote.jpg",
    },
    {
        id: 34,
        title: "Tempest at Sea",
        image: "/drawings/34_Stormy_Seas_And_Boat_Sketch.jpg",
    },
    {
        id: 35,
        title: "Garden's Bounty",
        image: "/drawings/35_Assorted_Vegetables_And_Fruit_Study.jpg",
    },
    {
        id: 36,
        title: "Shaded Profile",
        image: "/drawings/36_Woman_With_Sunglasses_Profile_Sketch.jpg",
    },
    {
        id: 37,
        title: "Monochrome Vortex",
        image: "/drawings/37_Abstract_Noire_Et_Blanc_Spirals.jpg",
    },
    {
        id: 38,
        title: "United We Stand",
        image: "/drawings/38_Patriotic_Eagle_Star_Composition.jpg",
    },
    {
        id: 39,
        title: "Color Grid Play",
        image: "/drawings/39_Primary_Color_Conundrum.jpg",
    },
    {
        id: 40,
        title: "Shattered Spectrum",
        image: "/drawings/40_Fragmented_Rainbow_Shards.jpg",
    },
    {
        id: 41,
        title: "Teal Tapestry",
        image: "/drawings/41_Ornate_Teal_Textile_Pattern.jpg",
    },
    {
        id: 42,
        title: "Violet Gold Bloom",
        image: "/drawings/42_Purple_And_Gold_Floral_Mandala.jpg",
    },
    {
        id: 43,
        title: "Butterfly Mandala",
        image: "/drawings/43_Symmetrical_Butterfly_Bloom_Mandala.jpg",
    },
    {
        id: 44,
        title: "Fan of Petals",
        image: "/drawings/44_Decorative_Hand_Fan_Floral_Design.jpg",
    },
    {
        id: 45,
        title: "Deep Sea Flora",
        image: "/drawings/45_Aquatic_Floral_Lampshade_Fantasy.jpg",
    },
    {
        id: 46,
        title: "Tribal Fisher",
        image: "/drawings/46_Tribal_Inspired_Fish_Graphic.jpg",
    },
    {
        id: 47,
        title: "Feline Moonlight",
        image: "/drawings/47_Moonlit_Silhouette_Cat_On_Fence.jpg",
    },
    {
        id: 48,
        title: "Blue Hour Reverie",
        image: "/drawings/48_Pensive_Man_In_Blue_Watercolor.jpg",
    },
    {
        id: 49,
        title: "Bamboo Wreath",
        image: "/drawings/49_Bamboo_And_Leaf_Handicraft_Wreath.jpg",
    },
    {
        id: 50,
        title: "Explosion of Pigment",
        image: "/drawings/50_Impasto_Chromatic_Explosion.jpg",
    },
    {
        id: 51,
        title: "Island Paradise Tee",
        image: "/drawings/51_Tropical_Island_Beach_TShirt_Art.jpg",
    },
    {
        id: 52,
        title: "Skyward Voyage",
        image: "/drawings/52_Journey_Through_The_Skies_And_Space.jpg",
    },
    {
        id: 53,
        title: "Harvest's Embrace",
        image: "/drawings/53_Farmers_Life_Illustrated_Typography.jpg",
    },
    {
        id: 54,
        title: "City's Cleanse",
        image: "/drawings/54_Street_Scene_Covid_Sanitization_Effort.jpg",
    },
    {
        id: 55,
        title: "Indian Rail Spectrum",
        image: "/drawings/55_Vibrant_Indian_Railway_Station_Scene.jpg",
    },
    {
        id: 56,
        title: "Wave Cascade",
        image: "/drawings/56_Optical_Gradient_Chevron_Waves.jpg",
    },
    {
        id: 57,
        title: "Golden Field Daydream",
        image: "/drawings/57_Daydreaming_In_A_Sunflower_Field.jpg",
    },
    {
        id: 58,
        title: "Festival of Hues",
        image: "/drawings/58_Joyful_Holi_Festival_Colors.jpg",
    },
    {
        id: 59,
        title: "Geometric Festivity",
        image: "/drawings/59_Abstract_Carnival_Of_Shapes.jpg",
    },
    {
        id: 60,
        title: "Vibrating Frequencies",
        image: "/drawings/60_Psychedelic_Soundwaves_Aura.jpg",
    },
    {
        id: 61,
        title: "Rainbow Serpentine",
        image: "/drawings/61_Fluid_Forms_Of_Rainbow_Creature.jpg",
    },
    {
        id: 62,
        title: "Sunflower Harmony",
        image: "/drawings/62_Sunflower_And_Vine_Roundel_Design.jpg",
    },
    {
        id: 63,
        title: "Green Guardians",
        image: "/drawings/63_Eco_Message_Against_Deforestation_Art.jpg",
    },
    {
        id: 64,
        title: "Rainy Night Glow",
        image: "/drawings/64_Girl_in_rain_Wet_lamp_post.jpg",
    },
    {
        id: 65,
        title: "Closeup Face of a Woman",
        image: "/drawings/65_Women_Closeup.jpg",
    },
    {
        id: 66,
        title: "Nana",
        image: "/drawings/66_Nana.jpg",
    },
    {
        id: 67,
        title: "Vari Nighali Pandhari",
        image: "/drawings/67_Vari_nighali_pandhari.jpg",
    },
    {
        id: 68,
        title: "Ganpati Bappa Morya",
        image: "/drawings/68_Ganpati_Bappa_morya.jpg",
    },
    {
        id: 69,
        title: "Self Portrait",
        image: "/drawings/69_Self_Portrait.jpg",
    },
    {
        id: 70,
        title: "Infinity Castle",
        image: "/drawings/70_Infinity_Castle.jpg",
    },
    {
        id: 71,
        title: "Her Eyes",
        image: "/drawings/71_Her_Eyes.jpg",
    },
];

export default artPieces;