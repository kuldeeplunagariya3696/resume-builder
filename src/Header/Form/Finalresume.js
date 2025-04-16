import React, { useContext, useRef } from "react";
import { FormData1 } from "./Demo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "./Finalresume.module.css";

function Finalresume({ dynamicData }) {
  const value = useContext(FormData1);
  const pdfRef = useRef();

  const { skills = [], workDescs = [], projectDescs = [], achievements = [] } = dynamicData || {};

  const downloadPDF = () => {
    const input = pdfRef.current;
    input.style.transform = "scale(0.7)";
    input.style.transformOrigin = "top left";
    input.style.width = "794px";

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("resume.pdf");

      input.style.transform = "";
      input.style.transformOrigin = "";
      input.style.width = "";
    });
  };

  return (
    <>
      <div ref={pdfRef} className={styles.container}>
        <h1 className={styles.name}>{value.fname} {value.lname}</h1>

        {(value.profession || value.city || value.country || value.phone || value.email) && (
          <div className={styles.section}>
            <h4>Personal Details</h4>
            <ul>
              {value.profession && <li><strong>Profession:</strong> {value.profession}</li>}
              {(value.city || value.country) && <li><strong>Location:</strong> {value.city}, {value.country}</li>}
              {value.phone && <li><strong>Mobile:</strong> {value.phone}</li>}
              {value.email && <li><strong>Email:</strong> {value.email}</li>}
            </ul>
          </div>
        )}

        {(value.college || value.school) && (
          <div className={styles.section}>
            <h4>Education</h4>
            <ul>
              {value.college && <li><strong>College:</strong> {value.college} ({value.year})</li>}
              {value.school && <li><strong>School:</strong> {value.school} ({value.yearc})</li>}
            </ul>
          </div>
        )}

        {(value.Skill || skills.some((k) => value[k])) && (
          <div className={styles.section}>
            <h4>Skills</h4>
            <ul>
              {value.Skill && <li>{value.Skill}</li>}
              {skills.map((k) => value[k] && <li key={k}>{value[k]}</li>)}
            </ul>
          </div>
        )}

        {(value.title || value.des || workDescs.some((d) => value[d])) && (
          <div className={styles.section}>
            <h4>Work Experience</h4>
            <ul>
              {value.title && <li><strong>Title:</strong> {value.title}</li>}
              {value.cname && <li><strong>Company:</strong> {value.cname}</li>}
              {value.cert_link && <li><strong>Certificate:</strong> <a href={value.cert_link}>{value.cert_link}</a></li>}
              {value.Location && <li><strong>Location:</strong> {value.Location}</li>}
              {value.sdate && value.edate && <li><strong>Duration:</strong> {value.sdate} to {value.edate}</li>}
              {value.des && <li>{value.des}</li>}
              {workDescs.map((d) => value[d] && <li key={d}>{value[d]}</li>)}
            </ul>
          </div>
        )}

        {(value.project_title || value.des_p || projectDescs.some((d) => value[d])) && (
          <div className={styles.section}>
            <h4>Projects</h4>
            <ul>
              {value.project_title && <li><strong>Title:</strong> {value.project_title}</li>}
              {value.overview && <li><strong>Overview:</strong> {value.overview}</li>}
              {value.github && <li><strong>GitHub:</strong> <a href={value.github}>{value.github}</a></li>}
              {value.des_p && <li>{value.des_p}</li>}
              {projectDescs.map((d) => value[d] && <li key={d}>{value[d]}</li>)}
            </ul>
          </div>
        )}

        {(value.achivement || achievements.some((a) => value[a])) && (
          <div className={styles.section}>
            <h4>Achievements</h4>
            <ul>
              {value.achivement && <li>{value.achivement}</li>}
              {achievements.map((a) => value[a] && <li key={a}>{value[a]}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={downloadPDF}>Download PDF</button>
      </div>
    </>
  );
}

export default Finalresume;
