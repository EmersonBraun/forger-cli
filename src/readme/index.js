const { getQuestions } = require('./prompts/index');
const { createReadme } = require('./generators/index');

module.exports = async function readmeGenerate() {
  const moduleName = await getQuestions();
  if (moduleName) {
    createReadme(moduleName);
  }
};
