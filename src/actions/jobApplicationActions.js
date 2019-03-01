export const SEND_APPLICATION = "SEND_APPLICATION";
export const SEND_JOB_APPLICATION_SUCCESS = "SEND_JOB_APPLICATION_SUCCESS";

export const sendApplication = data => ({
  type: SEND_APPLICATION,
  data
});

export const sendJobApplicationSuccess = () => ({
  type: SEND_JOB_APPLICATION_SUCCESS
})