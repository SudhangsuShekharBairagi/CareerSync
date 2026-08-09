import React, { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaChartLine,
  FaEye,
  FaSpinner,
  FaChevronRight,
} from "react-icons/fa";

import { getResumeHistory, getResumeAnalysisById } from "../api/AnaysisApi";

import CandidateAnalysis from "./CandidateAnalysis";

const ResumeHistory = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getResumeHistory();

        setResumes(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your resume history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleViewAnalysis = async (resumeId) => {
    try {
      setAnalysisLoading(true);
      setError(null);

      const data = await getResumeAnalysisById(resumeId);

      setSelectedAnalysis(data);

      setTimeout(() => {
        document.getElementById("resume-analysis")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error(error);
      setError("Unable to load resume analysis.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FaSpinner className="text-3xl text-blue-600 animate-spin" />

        <p className="mt-3 text-gray-500">Loading your resume history...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resume History</h1>

        <p className="text-gray-500 mt-1">
          View your previously uploaded resumes and their analysis.
        </p>
      </div>

      {error && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200
                        text-red-600 rounded-xl"
        >
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <div
          className="bg-white border border-gray-200
                     rounded-2xl p-10 text-center"
        >
          <FaFilePdf className="mx-auto text-5xl text-gray-300" />

          <h2 className="mt-4 text-lg font-semibold text-gray-800">
            No resumes found
          </h2>

          <p className="mt-1 text-gray-500">
            Upload a resume to start your analysis.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white border border-gray-200
                         rounded-2xl p-5
                         hover:border-blue-300
                         hover:shadow-sm
                         transition"
            >
              <div
                className="flex flex-col md:flex-row
                           md:items-center
                           md:justify-between
                           gap-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 shrink-0
                               rounded-xl bg-red-50
                               flex items-center justify-center"
                  >
                    <FaFilePdf className="text-red-500 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Resume #{resume.id}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {resume.candidateName}
                    </p>

                    <div
                      className="flex flex-wrap gap-4
                                 mt-2 text-sm text-gray-500"
                    >
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt />

                        {resume.createdAt
                          ? new Date(resume.createdAt).toLocaleDateString()
                          : "Unknown date"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FaChartLine />
                        ATS Score:
                        <span className="font-semibold text-gray-700">
                          {resume.atsScore}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleViewAnalysis(resume.id)}
                  disabled={analysisLoading}
                  className="inline-flex items-center
                             justify-center gap-2
                             px-5 py-2.5
                             bg-blue-600
                             text-white
                             rounded-xl
                             font-medium
                             hover:bg-blue-700
                             disabled:bg-gray-400
                             disabled:cursor-not-allowed
                             transition"
                >
                  {analysisLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <FaEye />
                      View Analysis
                      <FaChevronRight className="text-xs" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAnalysis && (
        <div id="resume-analysis" className="mt-10">
          <div
            className="flex flex-col sm:flex-row
                       sm:items-center
                       sm:justify-between
                       gap-3 mb-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Resume Analysis
              </h2>

              <p className="text-gray-500 mt-1">
                Analysis for Resume #{selectedAnalysis.id}
              </p>
            </div>

            <button
              onClick={() => setSelectedAnalysis(null)}
              className="px-4 py-2
                         border border-gray-300
                         rounded-lg
                         text-gray-600
                         hover:bg-gray-100
                         transition"
            >
              Close
            </button>
          </div>

          <CandidateAnalysis data={selectedAnalysis} />
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;
