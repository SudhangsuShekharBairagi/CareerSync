import React from "react";
import {
  FaUser,
  FaFileAlt,
  FaCode,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";

const CandidateAnalysis = ({ data }) => {
  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        No candidate analysis available.
      </div>
    );
  }

  const {
    candidateName,
    candidateSummary,
    technicalSkills = [],
    softSkills = [],
    strengths = [],
    weaknesses = [],
    missingKeywords = [],
    recommendedJobs = [],
    atsScore,
  } = data;

  const getScoreColor = () => {
    if (atsScore >= 80) return "text-green-600";
    if (atsScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = () => {
    if (atsScore >= 80) return "bg-green-100";
    if (atsScore >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
 
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
     
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="text-blue-600 text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {candidateName}
              </h1>

              <p className="text-gray-500 mt-1">Resume Analysis</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 px-5 py-4 rounded-xl ${getScoreBg()}`}
          >
            <FaChartLine className={`text-2xl ${getScoreColor()}`} />

            <div>
              <p className="text-sm text-gray-600">ATS Score</p>

              <p className={`text-3xl font-bold ${getScoreColor()}`}>
                {atsScore}%
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaFileAlt className="text-blue-600 text-xl" />

          <h2 className="text-xl font-semibold text-gray-900">
            Candidate Summary
          </h2>
        </div>

        <p className="text-gray-600 leading-7">{candidateSummary}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <FaCode className="text-purple-600 text-xl" />

            <h2 className="text-xl font-semibold">Technical Skills</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>


        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <FaUsers className="text-blue-600 text-xl" />

            <h2 className="text-xl font-semibold">Soft Skills</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaCheckCircle className="text-green-600 text-xl" />

          <h2 className="text-xl font-semibold">Strengths</h2>
        </div>

        <div className="space-y-3">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
            >
              <FaCheckCircle className="text-green-600 mt-1 shrink-0" />

              <p className="text-gray-700">{strength}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaExclamationTriangle className="text-orange-500 text-xl" />

          <h2 className="text-xl font-semibold">Areas to Improve</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {weaknesses.map((weakness, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-orange-50 text-orange-700 border border-orange-100 rounded-lg text-sm"
            >
              {weakness}
            </span>
          ))}
        </div>
      </section>

   
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-3 mb-5">
          <FaSearch className="text-red-500 text-xl mt-1" />

          <div>
            <h2 className="text-xl font-semibold">Missing Keywords</h2>

            <p className="text-sm text-gray-500 mt-1">
              Consider adding these keywords to improve your ATS score.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>


      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaBriefcase className="text-indigo-600 text-xl" />

          <h2 className="text-xl font-semibold">Recommended Jobs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedJobs.map((job, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-xl
                         hover:border-indigo-400
                         hover:bg-indigo-50/30
                         transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FaBriefcase className="text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">{job}</h3>

                  <p className="text-sm text-gray-500">
                    Recommended based on your resume
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CandidateAnalysis;
