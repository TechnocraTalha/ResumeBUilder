import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToDocx = async (resumeData) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeData;

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 1000, right: 1000, bottom: 1000, left: 1000 },
        },
      },
      children: [
        // Personal Info
        new Paragraph({
          text: personalInfo.fullName.toUpperCase(),
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun(
              [personalInfo.location, personalInfo.phone, personalInfo.email, personalInfo.linkedin]
                .filter(Boolean)
                .join(' • ')
            ),
          ],
        }),

        // Summary
        ...(summary ? [
          new Paragraph({
            text: 'PROFESSIONAL SUMMARY',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: summary,
            spacing: { after: 200 },
          }),
        ] : []),

        // Experience
        ...(experience.length > 0 ? [
          new Paragraph({
            text: 'EXPERIENCE',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          ...experience.flatMap(exp => [
             new Paragraph({
                spacing: { before: 100, after: 50 },
                children: [
                    new TextRun({ text: exp.position, bold: true }),
                    new TextRun({ text: ` | ${exp.startDate} - ${exp.endDate}`, italics: true }),
                ]
             }),
             new Paragraph({
                text: exp.company,
                bold: true,
                spacing: { after: 100 },
             }),
             ...(exp.description ? [new Paragraph({ text: exp.description, spacing: { after: 100 } })] : []),
             ...exp.highlights.map(item => new Paragraph({
                 text: item,
                 bullet: { level: 0 },
                 spacing: { after: 50 }
             }))
          ])
        ] : []),

        // Projects
        ...(projects.length > 0 ? [
            new Paragraph({
              text: 'PROJECTS',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            ...projects.flatMap(proj => [
                new Paragraph({
                    spacing: { before: 100, after: 50 },
                    children: [
                        new TextRun({ text: proj.name, bold: true }),
                        ...(proj.link ? [new TextRun({ text: ` | ${proj.link}` })] : [])
                    ]
                }),
                ...(proj.technologies && proj.technologies.length > 0 ? [
                    new Paragraph({
                        text: `Technologies: ${proj.technologies.join(', ')}`,
                        italics: true,
                        spacing: { after: 50 },
                    })
                ] : []),
                ...(proj.description ? proj.description.split('\n').filter(Boolean).map(item => new Paragraph({
                    text: item,
                    bullet: { level: 0 },
                    spacing: { after: 50 },
                })) : [])
            ])
        ]: []),

        // Skills
        ...(skills.length > 0 ? [
            new Paragraph({
              text: 'SKILLS',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            ...skills.map(s => new Paragraph({
               spacing: { after: 50 },
               children: [
                   new TextRun({ text: `${s.category}: `, bold: true }),
                   new TextRun({ text: s.items }),
               ]
            }))
        ]: []),

        // Certifications
        ...(certifications && certifications.length > 0 ? [
          new Paragraph({
            text: 'Certifications',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
          }),
          ...certifications.flatMap(cert => [
             new Paragraph({
                spacing: { before: 100, after: 50 },
                children: [
                    new TextRun({ text: cert.name, bold: true }),
                    new TextRun({ text: ` | ${cert.date}`, italics: true }),
                ]
             }),
             new Paragraph({
                text: cert.issuer,
                spacing: { after: 100 },
             })
          ])
        ] : []),

        // Education
        ...(education.length > 0 ? [
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
          }),
          ...education.flatMap(edu => [
             new Paragraph({
                spacing: { before: 100, after: 50 },
                children: [
                    new TextRun({ text: edu.institution, bold: true }),
                    new TextRun({ text: ` | ${edu.startDate} - ${edu.endDate}`, italics: true }),
                ]
             }),
             new Paragraph({
                text: `${edu.degree}${edu.field ? ` - ${edu.field}` : ''}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}`,
                spacing: { after: 100 },
             })
          ])
        ] : []),

      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
};
