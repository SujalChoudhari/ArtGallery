const artPieces = [
    {
        id: 1,
        title: "Man of Contemplation", // Previously "Portrait Man With Beard"
        image: "/drawings/08_Portrait_Man_With_Beard.jpg",
    },
    {
        id: 2,
        title: "Insightful Gaze", // Previously "Portrait Woman With Glasses"
        image: "/drawings/12_Portrait_Woman_With_Glasses.jpg",
    },

    {
        id: 20,
        title: "Joyful Expression", // Previously "Smiling Woman Portrait Sketch"
        image: "/drawings/13_Smiling_Woman_Portrait_Sketch.jpg",
    },
    {
        id: 65,
        title: "Closeup Face of a Women", // Previously "Portrait Man With Beard"
        image: "/drawings/65_Women_Closeup.jpg",
    },
    {
        id: 3,
        title: "Rainy Night Glow", // Previously "Girl in rain_Wet_lamp_post.jpg"
        image: "/drawings/64_Girl_in_rain_Wet_lamp_post.jpg",
    },
    
    // {
    //     id: 5,
    //     title: "Mechanized Intellect", // Previously "Detailed Robot Head Study"
    //     image: "/drawings/02_Detailed_Robot_Head_Study.jpg",
    // },
    {
        id: 6,
        title: "Charminar's Majesty", // Previously "Charminar Sketch Hyderabad"
        image: "/drawings/19_Charminar_Sketch_Hyderabad.jpg",
    },
    {
        id: 7,
        title: "Gateway to Mumbai", // Previously "Gateway Of India Sketch Mumbai"
        image: "/drawings/20_Gateway_Of_India_Sketch_Mumbai.jpg",
    },
    {
        id: 8,
        title: "Grandeur of Terminus", // Previously "Chhatrapati Shivaji Terminus"
        image: "/drawings/01_Chhatrapati_Shivaji_Terminus.jpg",
    },
    {
        id: 9,
        title: "Venetian Reflections", // Previously "Venice Canal Perspective"
        image: "/drawings/03_Venice_Canal_Perspective.jpg",
    },
    {
        id: 4,
        title: "Intricate Whispers", // Previously "Detailed Pen Sketch"
        image: "/drawings/11_Detailed_Pen_Sketch.jpg",
    },
    {
        id: 10,
        title: "Lakeside Calm in Graphite", // Previously "Lakeside Dock Pencil Landscape"
        image: "/drawings/28_Lakeside_Dock_Pencil_Landscape.jpg",
    },
    {
        id: 11,
        title: "Azure Waters Edge", // Previously "Lakeside Dock Watercolor Landscape"
        image: "/drawings/29_Lakeside_Dock_Watercolor_Landscape.jpg",
    },
    {
        id: 12,
        title: "Tempest at Sea", // Previously "Stormy Seas And Boat Sketch"
        image: "/drawings/34_Stormy_Seas_And_Boat_Sketch.jpg",
    },

    {
        id: 14,
        title: "Painter's Companion", // Previously "Realistic Paintbrush Study"
        image: "/drawings/16_Realistic_Paintbrush_Study.jpg",
    },
    {
        id: 15,
        title: "Blue Hour Reverie", // Previously "Pensive Man In Blue Watercolor"
        image: "/drawings/48_Pensive_Man_In_Blue_Watercolor.jpg",
    },
    {
        id: 16,
        title: "Golden Field Daydream", // Previously "Daydreaming In A Sunflower Field"
        image: "/drawings/57_Daydreaming_In_A_Sunflower_Field.jpg",
    },
    // {
    //     id: 17,
    //     title: "Indian Rail Spectrum", // Previously "Vibrant Indian Railway Station Scene"
    //     image: "/drawings/55_Vibrant_Indian_Railway_Station_Scene.jpg",
    // },
    {
        id: 18,
        title: "Emerald Pathway", // Previously "Perspective Path Lined With Trees"
        image: "/drawings/27_Perspective_Path_Lined_With_Trees.jpg",
    },
    {
        id: 19,
        title: "Shaded Profile", // Previously "Woman With Sunglasses Profile Sketch"
        image: "/drawings/36_Woman_With_Sunglasses_Profile_Sketch.jpg",
    },

    {
        id: 21,
        title: "Hands United", // Previously "Clasped Hands Gesture"
        image: "/drawings/17_Clasped_Hands_Gesture.jpg",
    },
    {
        id: 22,
        title: "Extended Reach", // Previously "Shaded Reaching Hand Study"
        image: "/drawings/18_Shaded_Reaching_Hand_Study.jpg",
    },
    {
        id: 23,
        title: "Undying Grasp", // Previously "Reaching Zombie Hand"
        image: "/drawings/07_Reaching_Zombie_Hand.jpg",
    },
    {
        id: 24,
        title: "Guardian of Keys", // Previously "Horned Skull With Keys"
        image: "/drawings/06_Horned_Skull_With_Keys.jpg",
    },
    {
        id: 25,
        title: "Tentacled Grin", // Previously "Skull With Flowing Tentacles"
        image: "/drawings/14_Skull_With_Flowing_Tentacles.jpg",
    },
    {
        id: 26,
        title: "Autumn's Smile", // Previously "Classic Jack O Lantern"
        image: "/drawings/04_Classic_Jack_O_Lantern.jpg",
    },
    {
        id: 27,
        title: "Volcanic Ascent", // Previously "Volcano Eruption Silhouette"
        image: "/drawings/09_Volcano_Eruption_Silhouette.jpg",
    },
    {
        id: 28,
        title: "Misty Morn's Embrace", // Previously "Misty Lake And Solitary Boat"
        image: "/drawings/22_Misty_Lake_And_Solitary_Boat.jpg",
    },
    // {
    //     id: 29,
    //     title: "Winter's Stillness", // Previously "Winter Lake And Bare Trees"
    //     image: "/drawings/30_Winter_Lake_And_Bare_Trees.jpg",
    // },
    // {
    //     id: 30,
    //     title: "Forest Nocturne", // Previously "Nocturnal Forest With Deer Silhouette"
    //     image: "/drawings/23_Nocturnal_Forest_With_Deer_Silhouette.jpg",
    // },
    {
        id: 31,
        title: "Feline Moonlight", // Previously "Moonlit Silhouette Cat On Fence"
        image: "/drawings/47_Moonlit_Silhouette_Cat_On_Fence.jpg",
    },
    {
        id: 32,
        title: "Garden's Bounty", // Previously "Assorted Vegetables And Fruit Study"
        image: "/drawings/35_Assorted_Vegetables_And_Fruit_Study.jpg",
    },
    {
        id: 33,
        title: "Sweet Distractions", // Previously "Tic Tac Mixers Still Life"
        image: "/drawings/21_Tic_Tac_Mixers_Still_Life.jpg",
    },
    {
        id: 34,
        title: "Crimson Bloom", // Previously "Vibrant Red Hibiscus"
        image: "/drawings/05_Vibrant_Red_Hibiscus.jpg",
    },
    {
        id: 35,
        title: "Star Blossom", // Previously "Delicate Pink Star Flower"
        image: "/drawings/10_Delicate_Pink_Star_Flower.jpg",
    },
    {
        id: 36,
        title: "Deep Sea Flora", // Previously "Aquatic Floral Lampshade Fantasy"
        image: "/drawings/45_Aquatic_Floral_Lampshade_Fantasy.jpg",
    },
    {
        id: 37,
        title: "Sunflower Harmony", // Previously "Sunflower And Vine Roundel Design"
        image: "/drawings/62_Sunflower_And_Vine_Roundel_Design.jpg",
    },
    {
        id: 38,
        title: "Bamboo Wreath", // Previously "Bamboo And Leaf Handicraft Wreath"
        image: "/drawings/49_Bamboo_And_Leaf_Handicraft_Wreath.jpg",
    },
    {
        id: 39,
        title: "Fan of Petals", // Previously "Decorative Hand Fan Floral Design"
        image: "/drawings/44_Decorative_Hand_Fan_Floral_Design.jpg",
    },
    {
        id: 40,
        title: "Teal Tapestry", // Previously "Ornate Teal Textile Pattern"
        image: "/drawings/41_Ornate_Teal_Textile_Pattern.jpg",
    },
    {
        id: 41,
        title: "Violet Gold Bloom", // Previously "Purple And Gold Floral Mandala"
        image: "/drawings/42_Purple_And_Gold_Floral_Mandala.jpg",
    },
    {
        id: 42,
        title: "Butterfly Mandala", // Previously "Symmetrical Butterfly Bloom Mandala"
        image: "/drawings/43_Symmetrical_Butterfly_Bloom_Mandala.jpg",
    },
    {
        id: 43,
        title: "Celestial Canvas", // Previously "Cosmic View Galaxy And Planets"
        image: "/drawings/25_Cosmic_View_Galaxy_And_Planets.jpg",
    },
    {
        id: 44,
        title: "Cosmic Kaleidoscope", // Previously "Celestial Collision Colorful Space Art"
        image: "/drawings/26_Celestial_Collision_Colorful_Space_Art.jpg",
    },
    {
        id: 45,
        title: "Skyward Voyage", // Previously "Journey Through The Skies And Space"
        image: "/drawings/52_Journey_Through_The_Skies_And_Space.jpg",
    },
    {
        id: 46,
        title: "United We Stand", // Previously "Patriotic Eagle Star Composition"
        image: "/drawings/38_Patriotic_Eagle_Star_Composition.jpg",
    },
    {
        id: 47,
        title: "Armored Resolve", // Previously "Iron Man Iconic Quote"
        image: "/drawings/31_Iron_Man_Iconic_Quote.jpg",
    },
    {
        id: 48,
        title: "Shield of Strength", // Previously "Captain America Endurance Quote"
        image: "/drawings/32_Captain_America_Endurance_Quote.jpg",
    },
    {
        id: 49,
        title: "Asgardian Might", // Previously "Thor God Of Thunder Quote"
        image: "/drawings/33_Thor_God_Of_Thunder_Quote.jpg",
    },
    {
        id: 50,
        title: "Tribal Fisher", // Previously "Tribal Inspired Fish Graphic"
        image: "/drawings/46_Tribal_Inspired_Fish_Graphic.jpg",
    },
    {
        id: 51,
        title: "Warli Village Life", // Previously "Traditional Warli Folk Art"
        image: "/drawings/24_Traditional_Warli_Folk_Art.jpg",
    },
    {
        id: 52,
        title: "Harvest's Embrace", // Previously "Farmers Life Illustrated Typography"
        image: "/drawings/53_Farmers_Life_Illustrated_Typography.jpg",
    },
    {
        id: 53,
        title: "Green Guardians", // Previously "Eco Message Against Deforestation Art"
        image: "/drawings/63_Eco_Message_Against_Deforestation_Art.jpg",
    },
    {
        id: 54,
        title: "City's Cleanse", // Previously "Street Scene Covid Sanitization Effort"
        image: "/drawings/54_Street_Scene_Covid_Sanitization_Effort.jpg",
    },
    {
        id: 55,
        title: "Festival of Hues", // Previously "Joyful Holi Festival Colors"
        image: "/drawings/58_Joyful_Holi_Festival_Colors.jpg",
    },
    {
        id: 56,
        title: "Island Paradise Tee", // Previously "Tropical Island Beach TShirt Art"
        image: "/drawings/51_Tropical_Island_Beach_TShirt_Art.jpg",
    },
    {
        id: 57,
        title: "Monochrome Vortex", // Previously "Abstract Noire Et Blanc Spirals"
        image: "/drawings/37_Abstract_Noire_Et_Blanc_Spirals.jpg",
    },
    {
        id: 58,
        title: "Wave Cascade", // Previously "Optical Gradient Chevron Waves"
        image: "/drawings/56_Optical_Gradient_Chevron_Waves.jpg",
    },
    {
        id: 59,
        title: "Color Grid Play", // Previously "Primary Color Conundrum"
        image: "/drawings/39_Primary_Color_Conundrum.jpg",
    },
    {
        id: 60,
        title: "Shattered Spectrum", // Previously "Fragmented Rainbow Shards"
        image: "/drawings/40_Fragmented_Rainbow_Shards.jpg",
    },
    {
        id: 61,
        title: "Explosion of Pigment", // Previously "Impasto Chromatic Explosion"
        image: "/drawings/50_Impasto_Chromatic_Explosion.jpg",
    },
    {
        id: 62,
        title: "Geometric Festivity", // Previously "Abstract Carnival Of Shapes"
        image: "/drawings/59_Abstract_Carnival_Of_Shapes.jpg",
    },
    {
        id: 63,
        title: "Vibrating Frequencies", // Previously "Psychedelic Soundwaves Aura"
        image: "/drawings/60_Psychedelic_Soundwaves_Aura.jpg",
    },
    {
        id: 64,
        title: "Rainbow Serpentine", // Previously "Fluid Forms Of Rainbow Creature"
        image: "/drawings/61_Fluid_Forms_Of_Rainbow_Creature.jpg",
    },
];

export default artPieces;