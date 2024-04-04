type Props = {
  searchParams: {[key: string]: string | string[] | undefined};
};

export default function ErrorPage({searchParams}: Props) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Please try again later</p>
      <p>Error code: {searchParams.code}</p>
    </div>
  );
}
