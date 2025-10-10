import Image from 'next/image';
import bg from '../../../../public/background/about-bg.png';
import Form from '@/components/contact/Form';
import Details from '@/components/contact/Details';
import FullScreenLoader from '@/components/FullScreenLoader';

export const metadata = {
  title: 'Contact',
};

export default function Contact() {
  return (
    <>
      <FullScreenLoader />
      <Image
        src={bg}
        alt="contact-bg"
        priority
        sizes="100vw"
        className="fixed left-0 top-0 -z-50 h-full w-full object-cover object-center opacity-50"
      />

      <article className="relative flex w-full flex-col items-center justify-center space-y-6 py-2 sm:py-0">
        <div className="flex w-full flex-col items-center justify-center space-y-6 sm:w-3/4">
          <h1 className="text-center text-2xl font-extrabold uppercase text-glow-stroke-neon sm:text-5xl">
            CONTACT ME
          </h1>
          <h2 className="text-center text-lg font-semibold uppercase tracking-wider glitter-text sm:text-xl">
            – get in touch –
          </h2>
          <p className="xs:text-base text-shadow-neon-light-orange text-center text-sm font-light">
            Step into the circle of enchantment and weave your words into the
            fabric of the cosmos. Whether you seek to conjure collaborations,
            unlock mysteries, or simply share tales of adventure, your messages
            are treasured scrolls within this realm. Use the form below to send
            your missives through the ethereal network, and await the whisper of
            magic in response.
          </p>
        </div>
        <div className='flex md:flex-nowrap flex-wrap justify-center md:justify-around items-start md:space-x-6'>
          <Details />
          <Form />
        </div>
      </article>
    </>
  );
}
