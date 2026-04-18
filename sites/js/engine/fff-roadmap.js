// FreeFitFuel Engine — Roadmap Intelligence

window.FFFRoadmap = (function () {
  'use strict';

  function getCurrentStage(roadmap) {
    if (!roadmap || !Array.isArray(roadmap.stages) || !roadmap.stages.length) return null;
    return roadmap.stages[0];
  }

  function summarise(roadmap) {
    if (!roadmap || !Array.isArray(roadmap.stages) || !roadmap.stages.length) {
      return {
        stages: 0,
        goal: null,
        currentStage: null
      };
    }

    return {
      stages: roadmap.stages.length,
      goal: roadmap.goal || null,
      currentStage: getCurrentStage(roadmap)
    };
  }

  return {
    getCurrentStage,
    summarise
  };
})();
