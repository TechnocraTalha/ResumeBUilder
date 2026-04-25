export const CLICHE_DICTIONARY = [
  { match: /team player/gi, suggestion: "Collaborated with cross-functional teams", reason: "Overused. Show, don't tell." },
  { match: /hard worker/gi, suggestion: "Consistently delivered high-quality results", reason: "Vague. Focus on actual deliverables." },
  { match: /responsible for/gi, suggestion: "Spearheaded / Managed / Executed", reason: "Passive. Use strong action verbs." },
  { match: /detail-oriented/gi, suggestion: "Meticulously managed / ensured precision in", reason: "Cliché. Provide a specific example instead." },
  { match: /synergy/gi, suggestion: "Collaboration / Alignment", reason: "Corporate buzzword." },
  { match: /go-getter/gi, suggestion: "Proactively initiated / Self-driven", reason: "Informal and cliché." },
  { match: /think outside the box/gi, suggestion: "Innovated / Developed creative solutions", reason: "Ironically, a very inside-the-box phrase." },
  { match: /results-driven/gi, suggestion: "Achieved X% growth / Delivered Y impact", reason: "Show the actual results instead of stating it." },
  { match: /dynamic/gi, suggestion: "Adaptable / Versatile", reason: "Often used as filler." },
  { match: /helped/gi, suggestion: "Facilitated / Assisted / Supported", reason: "A bit weak for professional resumes." }
];

export const scanResumeText = (resumeData) => {
  const issues = [];
  
  const scanField = (text, location) => {
    if (!text) return;
    CLICHE_DICTIONARY.forEach(({ match, suggestion, reason }) => {
      const regex = new RegExp(match);
      let m;
      while ((m = regex.exec(text)) !== null) {
        issues.push({
          phrase: m[0],
          suggestion,
          reason,
          location
        });
      }
    });
  };

  scanField(resumeData.summary, "Professional Summary");
  
  resumeData.experience.forEach((exp, i) => {
    scanField(exp.description, `Experience #${i + 1} (${exp.company})`);
    exp.highlights.forEach(h => scanField(h, `Experience #${i + 1} (${exp.company})`));
  });

  return issues;
};
