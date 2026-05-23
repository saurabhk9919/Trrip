import { useCallback, useRef, useState } from "react";
import { uploadDocument } from "../services/uploadService";

export default function UploadDropzone({ onComplete }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (f) => {
    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    return f && allowed.includes(f.type);
  };

  const handleFiles = async (f) => {
    setError("");
    if (!f) return;
    if (!validateFile(f)) {
      setError("Only PDF, PNG, JPG files are allowed");
      return;
    }
    setFile(f);
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files && e.dataTransfer.files[0];
    await handleFiles(dropped);
  }, []);

  const handleChange = async (e) => {
    const f = e.target.files && e.target.files[0];
    await handleFiles(f);
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file to upload");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("document", file);
      const data = await uploadDocument(formData);
      if (onComplete) onComplete(null, data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Upload failed"
      );
      if (onComplete) onComplete(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={handleDrop}
      className={`w-full border-2 rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-300"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">Drag & drop your PDF or click to select</p>
        <p className="text-sm text-gray-500 mt-1">Supported: PDF, PNG, JPG</p>
        {file && (
          <p className="mt-3 text-sm text-gray-600">Selected: {file.name}</p>
        )}

        <div className="mt-4 flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Browse
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload & Generate"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}
