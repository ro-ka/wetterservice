import meSpeak from 'mespeak';

import getText from '../../src/get-text';

meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"))

function Audio({ text }) {
  return meSpeak.speak("hello world", { rawdata: "buffer" });
}

export default Audio;

export async function getServerSideProps() {
  const text = await getText();
  return { props: { text } };
}
