type Props = {
  params: {
    slug: number;
  };
};

export default function Page({ params }: Props) {
  return <h1>{`slug -> [ ${params.slug} ]`}</h1>;
}
