import getText from '../src/get-text';

function About({ text }: { text: string }) {
  return text;
}

export default About;

export async function getServerSideProps() {
  const text = await getText();
  return { props: { text } };
}

