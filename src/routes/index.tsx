import { Title } from '@solidjs/meta';
import { createAsync } from '@solidjs/router';
import Counter from '~/components/Counter';
import { api } from '~/lib/api';

export default function Home() {
  const hello = createAsync(() => api.example.hello.query(1));
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Title>Hello World</Title>
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <p class="mt-8">
        Visit{' '}
        <a
          href="https://start.solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
      <pre>
        <code>{JSON.stringify(hello(), null, 2)}</code>
      </pre>
    </main>
  );
}
