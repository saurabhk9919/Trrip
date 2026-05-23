import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UploadDropzone from "../components/UploadDropzone";
import {
  uploadDocument,
  getHistory,
} from "../services/uploadService";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);


  const fetchHistory = async () => {

    try {

      const data = await getHistory();

      setHistory(data);

    } catch (error) {

      console.error(error);
    }
  };


  return (

    <MainLayout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          Travel Dashboard
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Travel Booking</h2>

          <UploadDropzone
            onComplete={(err, data) => {
              if (err) {
                setError(
                  err.response?.data?.message ||
                  err.message ||
                  "Upload failed"
                );
                return;
              }
              setError("");
              setItinerary(data?.itinerary || "");
              fetchHistory();
            }}
          />

          {error && <p className="text-red-500 mt-4">{error}</p>}

        </div>

        {itinerary && (

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              AI Generated Itinerary
            </h2>

            <div className="whitespace-pre-wrap text-gray-700">
              {itinerary}
            </div>

          </div>
        )}

        {/* History Section */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6 text-blue-600">
            Previous Itineraries
          </h2>

          <div className="space-y-6">

            {history.map((item) => (

              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-md"
              >

                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <p className="font-semibold mb-4">
                  File: {item.originalFile}
                </p>

                <div className="whitespace-pre-wrap text-gray-700">
                  {item.itinerary}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </MainLayout>
  );
}
export default DashboardPage;