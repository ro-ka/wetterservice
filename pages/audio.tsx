import say from 'say';

import getText from '../src/get-text';

function Audio({ text }: { text: string }) {
  return text;
}

export default Audio;

export async function getServerSideProps() {
  const text = await getText();
  return { props: { text } };
}
