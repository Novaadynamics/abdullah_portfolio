'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export default function Form() {
  const [launch, setLaunch] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (params) => {
    const toastId = toast.loading('Sending your message, please wait...');

    toast.info(
      'Form submissions are demo-only here. Please checkout the final code repo to enable it. If you want to connect you can reach out to me via codebucks27@gmail.com.',
      {
        id: toastId,
      },
    );

    // comment out the above toast.info and uncomment the below code to enable emailjs

    // emailjs
    //   .send(
    //     process.env.NEXT_PUBLIC_SERVICE_ID,
    //     process.env.NEXT_PUBLIC_TEMPLATE_ID,
    //     params,
    //     {
    //       publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    //       limitRate: {
    //         throttle: 5000, // you can not send more then 1 email per 5 seconds
    //       },
    //     }
    //   )
    //   .then(
    //     () => {
    //       toast.success(
    //         "I have received your message, I will get back to you soon!",
    //         {
    //           id: toastId,
    //         }
    //       );
    //     },
    //     (error) => {
    //       // console.log("FAILED...", error.text);
    //       toast.error(
    //         "There was an error sending your message, please try again later!",
    //         {
    //           id: toastId,
    //         }
    //       );
    //     }
    //   );
  };

  const onSubmit = (data) => {
    const templateParams = {
      to_name: 'CodeBucks',
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };
    setLaunch(true);

    // Reset rocket after 3s (optional)
    setTimeout(() => setLaunch(false), 3000);

    sendEmail(templateParams);
  };



  return (
    <>
      <Toaster richColors={true} />
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full h-full py-6 custom-bg-2 px-12 rounded-lg max-w-md flex-col items-center justify-center space-y-2"
      >
        <motion.div variants={item} className="w-full">
          <h2 className="text-[2em] text-amethyst-neon">Message Me</h2>
        </motion.div>

        <motion.input
          variants={item}
          type="text"
          placeholder="Full Name"
          {...register('name', {
            required: 'This field is required!',
            minLength: {
              value: 3,
              message: 'Name should be atleast 3 characters long.',
            },
          })}
          className="custom-bg-2 w-[20em] rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.name && (
          <span className="inline-block self-start text-accent">
            {errors.name.message}
          </span>
        )}
        <motion.input
          variants={item}
          type="email"
          placeholder="Email"
          {...register('email', { required: 'This field is required!' })}
          className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.email && (
          <span className="inline-block self-start text-accent">
            {errors.email.message}
          </span>
        )}
        <motion.input
          variants={item}
          type="text"
          placeholder="Subject"
          {...register('subject', { required: 'This field is required!' })}
          className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.subject && (
          <span className="inline-block self-start text-accent">
            {errors.subject.message}
          </span>
        )}
        <motion.textarea
          variants={item}
          placeholder="Message"
          {...register('message', {
            required: 'This field is required!',
            maxLength: {
              value: 500,
              message: 'Message should be less than 500 characters',
            },
            minLength: {
              value: 50,
              message: 'Message should be more than 50 characters',
            },
          })}
          className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}
        {/* <motion.input
          variants={item}
          value="Cast your message!"
          className="cursor-pointer py-2.5 px-3 rounded-md border border-ember-neon bg-yellow-400/10 backdrop-blur-md  text-white hover:shadow-[inset_0_4px_12px_rgba(251,191,36,0.25)]"
          type="submit"
        /> */}

        <AnimatePresence mode="wait">
          {!launch ? (
            <motion.input
              key="submit"
              type="submit"
              value="SEND MESSAGE!" // Cast your
              className="cursor-pointer py-1.5 px-5 rounded-full border border-ember-neon bg-yellow-400/10 backdrop-blur-md text-shadow-neon-orange font-semibold tracking-wide shadow-sm hover:shadow-[0_0_10px_#ffb627]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ) : ( 
            <motion.div
              key="rocket"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ x: 400, opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeIn" }}
              className="relative flex flex-col items-center"
            >
              {/* 🚀 Rocket Body */}
              <motion.div
                initial={{ x: 0, rotate: 90 }}
                animate={{
                  x: [0, -2, 0, 2, 0], // subtle shake
                }}
                transition={{ duration: 0.4, repeat: 3 }}
                className="relative w-8 h-16 bg-gradient-to-b from-gray-200 to-gray-500 rounded-full border border-white shadow-lg"
              >
                {/* Nose Cone */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 
                        border-l-[16px] border-r-[16px] border-b-[20px] 
                        border-l-transparent border-r-transparent border-b-gray-400" />

                {/* Windows */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-400 border border-white shadow-md" />

                {/* Side Fins */}
                <div className="absolute -bottom-2 -left-3 w-4 h-4 bg-red-500 rotate-45 rounded-sm shadow-md" />
                <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-red-500 -rotate-45 rounded-sm shadow-md" />

                {/* 🔥 Flames */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-full blur-md"
                />
              </motion.div>

              {/* Glowing Exhaust Trail */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.8, 0.4, 0], scale: [1, 1.2, 0.9], y: [0, 60, 120] }}
                transition={{ duration: 2.4, ease: "easeOut" }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-40 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent blur-xl rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.form>
    </>
  );
}
