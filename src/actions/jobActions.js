//exporting action objects for job reducer later

export const FETCH_JOB_DATA = "FETCH_JOB_DATA";

export function fetchJobAction(obj) {
  return {
    type: FETCH_JOB_DATA,
    data: obj
  };
}