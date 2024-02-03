/* eslint-disable */
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markUp = `<div class= "alert alert--${type}">${msg}</div> `;
  document.body.insertAdjacentHTML('afterbegin', markUp);
  setTimeout(hideAlert, 5000);
};
