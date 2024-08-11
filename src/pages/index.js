import Head from 'next/head';
import Painter from '../components/Painter/Painter';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js Painter</title>
      </Head>
      <main>
        <h1>Next.js Painter</h1>
        <Painter width={450} height={407} />
      </main>
    </div>
  );
}

