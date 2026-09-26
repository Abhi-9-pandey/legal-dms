import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

function Documents() {

  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);


  const fetchDocuments = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDocuments(
        response.data.documents
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to load documents"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchDocuments();
  }, []);


  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);
    setUploadError("");
  };


  const handleUpload = async () => {

    if (!selectedFile) {
      setUploadError(
        "Please select a document first."
      );

      return;
    }

    try {

      setUploading(true);
      setUploadError("");

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "document",
        selectedFile
      );

      await api.post(
        "/documents/upload",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setSelectedFile(null);

      document
        .getElementById("document-upload")
        .value = "";

      await fetchDocuments();

    } catch (error) {

      setUploadError(
        error.response?.data?.message ||
        "Document upload failed"
      );

    } finally {

      setUploading(false);

    }
  };


  const formatSize = (bytes) => {

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };


  const formatDate = (date) => {

    return new Date(date)
      .toLocaleString();
  };


  const filteredDocuments =
    useMemo(() => {

      return documents.filter(
        (document) =>
          document.originalName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [documents, search]);


  return (
    <div>

      {/* Page Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

        <div>

          <p className="text-sm text-cyan-400 mb-2">
            Document Management
          </p>

          <h1 className="text-3xl font-semibold">
            Documents
          </h1>

          <p className="text-slate-400 mt-2">
            Securely manage your organization's
            legal and investigation documents.
          </p>

        </div>


        {/* Upload */}

        <div className="flex items-center gap-3">

          <input
            id="document-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="document-upload"
            className="cursor-pointer px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
          >
            Select File
          </label>

          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              !selectedFile
            }
            className="px-5 py-2.5 rounded-lg bg-cyan-400 text-slate-950 font-medium hover:bg-cyan-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>

        </div>

      </div>


      {/* Selected File */}

      {selectedFile && (
        <div className="mb-6 p-4 rounded-xl border border-cyan-900 bg-cyan-950/30">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-white font-medium">
                {selectedFile.name}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {formatSize(
                  selectedFile.size
                )}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedFile(null)
              }
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>

          </div>

        </div>
      )}


      {/* Upload Error */}

      {uploadError && (
        <div className="mb-6 p-4 rounded-xl border border-red-900 bg-red-950/30 text-red-400">
          {uploadError}
        </div>
      )}


      {/* Search */}

      <div className="mb-6">

        <div className="max-w-xl flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

          <span className="text-slate-500">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search documents..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-slate-600 w-full"
          />

        </div>

      </div>


      {/* Loading */}

      {loading && (
        <div className="text-slate-500">
          Loading documents...
        </div>
      )}


      {/* Error */}

      {!loading && error && (
        <div className="p-5 rounded-xl border border-red-900 bg-red-950/30 text-red-400">
          {error}
        </div>
      )}


      {/* Empty */}

      {!loading &&
        !error &&
        filteredDocuments.length === 0 && (

          <div className="border border-dashed border-slate-800 rounded-2xl p-16 text-center">

            <div className="text-4xl mb-4">
              ◫
            </div>

            <h2 className="text-lg font-medium text-white">
              {search
                ? "No matching documents"
                : "No documents yet"}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              {search
                ? "Try a different search term."
                : "Upload your first document to begin."}
            </p>

          </div>

        )}


      {/* Documents */}

      {!loading &&
        !error &&
        filteredDocuments.length > 0 && (

          <div className="space-y-3">

            {filteredDocuments.map(
              (document) => (

                <div
                  key={document._id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
                >

                  <div className="flex items-center justify-between gap-5">

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 shrink-0 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        ◫
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-medium text-white truncate">
                          {document.originalName}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          {document.mimeType}
                          {" · "}
                          {formatSize(
                            document.size
                          )}
                        </p>

                      </div>

                    </div>


                    <div className="hidden md:block text-right">

                      <p className="text-xs text-slate-400">
                        {document.uploadedBy?.name ||
                          "Unknown user"}
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        {formatDate(
                          document.createdAt
                        )}
                      </p>

                    </div>


                    <button
                      className="text-slate-500 hover:text-white px-2"
                      title="More actions"
                    >
                      •••
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

    </div>
  );
}

export default Documents;
