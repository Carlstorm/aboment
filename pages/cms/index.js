import Cms from "../../cms/cms";

export default function cms() {
    return <Cms />
}

export async function getStaticProps() {
    return {
        props: { cms: true },
      };
}
  