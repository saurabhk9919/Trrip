import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold text-blue-600">
          AI Travel Itinerary Generator
        </h1>
      </div>
    </MainLayout>
  );
}

export default HomePage;