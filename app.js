function uploadFile(subject, fileName, fileType = '') {
  cy.fixture(fileName,'base64')
  .then( (content) => Cypress.Blob.base64StringToBlob(content, fileType))
  .then( (blob) => {
      const el = subject[0];
      const testFile = new File([blob], fileName, {type: fileType});
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      el.files = dataTransfer.files;
      cy.wrap(subject).trigger('change', { force: true });
    });
}

module.exports = uploadFile