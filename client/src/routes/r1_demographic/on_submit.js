import { API_HTTP_NEW_PLAYER_JOIN_DOMAIN_ENDPOINT } from "../../config";
import { DEV_FLAG_KEY_NAME } from "../../dev_util/util";

function calculate_age_fn(dob) {
  const birthday = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    return age - 1;
  }
  return age;
}

export async function on_submit_demographic_data_fn(data, history_mut_ref) {
  if (data[DEV_FLAG_KEY_NAME] == true) {
    fetch(API_HTTP_NEW_PLAYER_JOIN_DOMAIN_ENDPOINT, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(
        (
          /**@type {{player_id}} */
          { player_id }
        ) => {
          history_mut_ref.push(`/player/${player_id}`);
        }
      );
    return;
  }
  const age = calculate_age_fn(data.dateOfBirth);

  // Adjust for timezone offset to avoid the date changing due to UTC conversion
  data.dateOfBirth.setMinutes(
    data.dateOfBirth.getMinutes() + data.dateOfBirth.getTimezoneOffset()
  );

  const formattedDateOfBirth = data.dateOfBirth.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const payload = {
    roomid: roomId,
    player_num: player_id,
    player_name: data.playerName,
    age,
    dob: formattedDateOfBirth,
    education: data.yearsOfEducation,
    gender: data.gender,
    native_eng: data.nativeEnglishSpeaker === "Yes" ? 1 : 0,
    first_lan: data.nativeLanguage,
    eng_acq_age: data.ageLearningEnglish,
    ethnicity: data.ethnicity,
    q1: data.q1,
    q2: data.q2,
    q3: data.q3,
    q4: data.q4,
    q5: data.q5,
    q6: data.q6,
    q7: data.q7,
    q8: data.q8,
    q9: data.q9,
    q10: data.q10,
  };

  try {
    fetch(API_HTTP_NEW_PLAYER_JOIN_DOMAIN_ENDPOINT, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(
        (
          /**@type {{player_id}} */
          { player_id }
        ) => {
          history_mut_ref.push(`/player/${data.player_id}`);
        }
      );
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}
