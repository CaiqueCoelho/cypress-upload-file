import hexStringToByte from "./utils";

/**
 * This function help cypress to upload a file to a file upload input
 * using any type of file extension: png, jpg, jpeg, gif, pdf, svg, mp3, docx.
 * You need to have your file stored in fixtures cypress folder
 * Call this function with some selector element, with file name, and file type
 *
 * @param  {String} selectorElement Some selector information to find the file upload input element
 * @param  {String} fileName Name of the file with with its extension, exampĺe image.png
 * @param {String}      fileType The file type extension like: png, jpeg, jpg, pdf
 * @return {VoidFunction}      This function don't returned anything
 */

function uploadFile(selectorElement, fileName, fileType) {
  cy.get(selectorElement).then((subject) => {
    cy.fixture(fileName, "hex").then((fileHex) => {
      const fileBytes = hexStringToByte(fileHex);
      const testFile = new File([fileBytes], fileName, {
        type: fileType,
      });
      const dataTransfer = new DataTransfer();
      const el = subject[0];

      dataTransfer.items.add(testFile);
      el.files = dataTransfer.files;

      Cypress.log({
        name: "uploadFile",
        displayName: "FILE",
        message: fileName,
      });
    });
  });
}

export default uploadFile;
