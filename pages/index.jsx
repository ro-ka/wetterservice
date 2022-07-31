import getText from '../src/get-text';

function Index({ text }) {
  return text;
}

export default Index;

export async function getServerSideProps() {
  const text = await getText();
  return { props: { text } };
}
