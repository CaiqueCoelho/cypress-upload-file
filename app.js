import hexStringToByte from "./utils";

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
    });
  });
}

export default uploadFile;
