export const calculateATSScore = (text) => {
  let score = 0;

  const lowerText = text.toLowerCase();

  // Contact Info
  if (lowerText.includes("@")) score += 10;

  // Skills
  const skills = [
    "node.js",
    "express",
    "mongodb",
    "mysql",
    "aws",
    "docker",
    "react",
    "angular",
    "typescript",
    "python",
    "microservices",
    "rest api",
    "jwt",
  ];

  skills.forEach((skill) => {
    if (lowerText.includes(skill)) {
      score += 3;
    }
  });

  // Experience
  if (lowerText.includes("experience")) score += 15;

  // Projects
  if (lowerText.includes("technical projects")) score += 15;

  // Education
  if (lowerText.includes("education")) score += 10;

  return Math.min(score, 100);
};