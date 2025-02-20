import React from "react";
import { useHistory } from "react-router-dom";

import "./landing.css";
import { API_HTTP_NEW_PLAYER_JOIN_DOMAIN_ENDPOINT } from "../../config.js";

export function LandingPage() {
  let history = useHistory();
  function join_btn_click_handler_fn() {
    history.push(`/demographic`);
  }

  return (
    <div className="main">
      <div>
        <h1
          style={{ fontWeight: "bold", textAlign: "center", fontSize: "35px" }}
        >
          Playing Online Board Games to Make Group Decisions
        </h1>
        <br />
        <p>
          The purpose of this study is to understand how a small group of people
          make decisions by doing information exchange. Participating in this
          study will involve filling out surveys and playing online board games.
          During the study, you will be assigned to play the online board games
          with other group members. During the game, each group member will be
          given a unique deck of cards containing different information. You
          will need to exchange cards with your group members in order to solve
          the game scenarios and optimize the group performance.The
          participation will last about 30 minutes. There is a slight chance
          that the study may go longer depending on your group members. No risk
          is expected in this study; benefits related to this research include
          advancing our understandings in group decision making and collective
          intelligence.
        </p>
        <br />
        <p>
          Principal Investigator Name and Title: Jessie Chin, Assistant
          Professor
        </p>
        <p>
          Department and Institution: Information Sciences, University of
          Illinois at Urbana-Champaign
        </p>
        <p>Contact Information: chin5@illinois.edu </p>
        <p className="landing_highlight">What procedures are involved? </p>
        <br />
        <p>
          The study procedures are (1) completing a survey, (2) playing online
          board games.
        </p>
        <br></br>
        <p>The study will last about 30 minutes.</p>
        <p className="landing_highlight">
          Will my study-related information be kept confidential?
        </p>
        <br />
        <p>
          Faculty, students, and staff who may see your information will
          maintain confidentiality to the extent of laws and university
          policies. Personal identifiers will not be published or presented
        </p>
        <br />
        <p className="landing_highlight">
          Will I be reimbursed for any expenses or paid for my participation in
          this research?
        </p>
        <br />
        <p>You will be paid $7.5 after the completion of the study. </p>
        <br />
        <p className="landing_highlight">
          Can I withdraw or be removed from the study?
        </p>
        <br />
        <p>
          If you decide to participate, you are free to withdraw your consent
          and discontinue participation at any time. Your participation in this
          research is voluntary. Your decision whether or not to participate, or
          to withdraw after beginning participation, will not affect your
          current or future dealings with the University of Illinois at
          Urbana-Champaign.
        </p>
        <br />
        <p className="landing_highlight">
          Will data collected from me be used for any other research?
        </p>
        <br />
        <p>
          Your data will not be used or distributed for future use. No
          identifiers will be collected.
        </p>
        <br />
        <p className="landing_highlight">
          Who should I contact if I have questions?
        </p>
        <br />
        <p>
          Contact the researchers Jessie Chin, Assistant Professor in
          Information Sciences, chin5@illinois.edu if you have any questions
          about this study or your part in it, or if you have concerns or
          complaints about the research.
        </p>
        <br />
        <p className="landing_highlight">
          What are my rights as a research subject?
        </p>
        <br />
        <p>
          If you have any questions about your rights as a research subject,
          including concerns, complaints, or to offer input, you may call the
          Office for the Protection of Research Subjects (OPRS) at 217-333-2670
          or e-mail OPRS at irb@illinois.edu. If you would like to complete a
          brief survey to provide OPRS feedback about your experiences as a
          research participant, please follow the link
          <a href="https://redcap.healthinstitute.illinois.edu/surveys/?s=47X9T4NE4X">
            here
          </a>
          or through a link on the OPRS website:
          https://oprs.research.illinois.edu/. You will have the option to
          provide feedback or concerns anonymously or you may provide your name
          and contact information for follow-up purposes.
        </p>
        <br />
        <p className="landing_highlight">
          Please print this consent form if you would like to retain a copy for
          your records.
        </p>
        <br />
        <p>
          I have ready and understand the above consent form. I certify that I
          am the Native speakers of English, and aged 18 years old or older. By
          clicking the “Submit” button to enter the survey, I indicate my
          willingness to voluntarily take part in this study.
        </p>
        <br></br>
      </div>
      <div style={{ margin: "auto" }}>
        <button className="button" onClick={join_btn_click_handler_fn}>
          Consent and Proceed
        </button>
      </div>
    </div>
  );
}
