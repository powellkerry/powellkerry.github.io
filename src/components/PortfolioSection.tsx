import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const PortfolioSection: React.FC = () => {
  const [workHistory, setWorkHistory] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    fetch("data/work-history.json")
      .then((res) => res.json())
      .then((data) => setWorkHistory(data.companies || []));
    fetch("data/education.json")
      .then((res) => res.json())
      .then((data) => setEducation(data.education || []));
    fetch("data/certifications.json")
      .then((res) => res.json())
      .then((data) => setCertifications(data.certifications || []));
  }, []);

  const handleAccordion = (idx: number) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  return (
    <section id="portfolio" className="space-y-12">
      {/* Employment Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Employment</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workHistory.map((job, idx) => (
            <Card key={idx} className="shadow-lg">
              {job.img && (
                <img
                  src={job.img}
                  alt={job.name}
                  className="w-full h-40 object-cover rounded-t"
                  loading="lazy"
                />
              )}
              <CardBody>
                <Typography variant="h5" as="h3" className="mb-1 font-bold">{job.position}</Typography>
                <Typography variant="h6" as="h4" className="mb-1">{job.name}</Typography>
                <Typography className="mb-1 text-sm text-gray-600">{job.location}</Typography>
                <Typography className="mb-1 text-sm text-gray-600">{job.startDate} - {job.endDate}</Typography>
                <Typography className="mb-2">{job.description}</Typography>
                {job.achievements && job.achievements.length > 0 && (
                  <Accordion open={openAccordion === idx} icon={<span>{openAccordion === idx ? '-' : '+'}</span>}>
                    <AccordionHeader onClick={() => handleAccordion(idx)} className="text-base font-semibold">
                      Achievements
                    </AccordionHeader>
                    <AccordionBody>
                      <ul className="list-disc ml-5 mb-2">
                        {job.achievements.map((ach: string, i: number) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </AccordionBody>
                  </Accordion>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.technologies && job.technologies.map((tech: string, i: number) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {education.map((edu: any, idx: number) => (
            <Card key={idx} className="shadow-lg">
              {edu.img && (
                <img
                  src={edu.img}
                  alt={edu.institution}
                  className="w-full h-40 object-cover rounded-t"
                  loading="lazy"
                />
              )}
              <CardBody>
                <Typography variant="h6" as="h3" className="mb-1 font-bold">{edu.degree}</Typography>
                <Typography className="mb-1">{edu.institution}</Typography>
                <Typography className="mb-1 text-sm text-gray-600">{edu.location}</Typography>
                <Typography className="mb-1 text-sm text-gray-600">{edu.startDate} - {edu.endDate}</Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert: any, idx: number) => (
            <Card key={idx} className="shadow-lg">
              {cert.img && (
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="w-full h-40 object-cover rounded-t"
                  loading="lazy"
                />
              )}
              <CardBody>
                <Typography variant="h6" as="h3" className="mb-1 font-bold">{cert.name}</Typography>
                <Typography className="mb-1">{cert.provider}</Typography>
                <Typography className="mb-1 text-sm text-gray-600">{cert.date}</Typography>
                <Typography className="mb-2">{cert.description}</Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;