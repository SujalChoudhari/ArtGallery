export default function SkeletonCard() {
    // Random height between 200px and 400px to mimic masonry variation
    const randomHeight = Math.floor(Math.random() * (400 - 200 + 1)) + 200;

    return (
        <div
            className="bg-gray-200 animate-pulse rounded-none w-full mb-4"
            style={{ height: `${randomHeight}px` }}
        />
    );
}
