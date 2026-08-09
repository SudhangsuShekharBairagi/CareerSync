import React, { useState } from "react";
import { uploadResume } from "../api/AnaysisApi";
import CandidateAnalysis from "./CandidateAnalysis";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaChartLine,
  FaSpinner,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const inputFile = e.target.files[0];

    if (!inputFile) {
      setFile(null);
      return;
    }

    setFile(inputFile);
    setError(null);
    setAnalysisData(null);
  };

  const handleGetAnalysis = async () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await uploadResume(file);

      setAnalysisData(data);
    } catch (error) {
      console.error(error);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <FaFileAlt />;

    if (file.type === "application/pdf") {
      return <FaFilePdf />;
    }

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FaFileWord />;
    }

    return <FaFileAlt />;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

  
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaChartLine className="text-blue-600 text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Resume Analyzer
          </h1>

          <p className="mt-2 text-gray-500">
            Upload your resume and get your ATS score and career insights.
          </p>
        </div>

      
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <label
            htmlFor="resume-upload"
            className="block cursor-pointer"
          >
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center
                            hover:border-blue-500 hover:bg-blue-50/30 transition">

              <FaCloudUploadAlt className="mx-auto text-5xl text-blue-500 mb-4" />

              <h2 className="text-lg font-semibold text-gray-800">
                Upload your resume
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Click here to select your resume
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOC, DOCX
              </p>

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>

          {file && (
            <div className="mt-5 flex items-center justify-between gap-4 p-4
                            bg-gray-50 border border-gray-200 rounded-xl">

              <div className="flex items-center gap-3 min-w-0">

                <div className="w-11 h-11 rounded-lg bg-blue-100
                                flex items-center justify-center shrink-0">

                  <span className="text-blue-600 text-xl">
                    {getFileIcon()}
                  </span>

                </div>

                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <FaCheckCircle className="text-green-500 text-xl shrink-0" />
            </div>
          )}

          <button
            type="button"
            onClick={handleGetAnalysis}
            disabled={loading || !file}
            className="w-full mt-6 flex items-center justify-center gap-2
                       bg-blue-600 text-white py-3.5 px-5 rounded-xl
                       font-semibold
                       hover:bg-blue-700
                       transition
                       disabled:bg-gray-400
                       disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />

                <span>
                  Analyzing Resume...
                </span>
              </>
            ) : (
              <>
                <FaChartLine />

                <span>
                  Analyze Resume
                </span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 flex items-start gap-3 p-4
                            bg-red-50 border border-red-200
                            text-red-600 rounded-xl">

              <FaTimesCircle className="mt-0.5 shrink-0" />

              <p className="text-sm">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="max-w-6xl mx-auto mt-8">

          <div className="bg-white rounded-2xl border border-gray-200
                          shadow-sm p-8 text-center">

            <FaSpinner
              className="mx-auto text-4xl text-blue-600 animate-spin"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Analyzing your resume
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Please wait while we analyze your resume and calculate
              your ATS score.
            </p>
          </div>
        </div>
      )}


      {!loading && analysisData && (
        <div className="max-w-6xl mx-auto mt-10">

          <CandidateAnalysis
            data={analysisData}
          />

        </div>
      )}
    </div>
  );
}

export default UploadResume;