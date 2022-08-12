import Cms from "../../cms/Cms";

export default function cms() {
    return <Cms />
}

export async function getStaticProps() {
    return {
        props: { cms: true },
      };
}
  