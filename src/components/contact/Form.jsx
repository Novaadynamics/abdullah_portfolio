'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
    reset
  } = useForm();

  const sendEmail = async (params) => {
    try {
      const res = await fetch(`/api/send-mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params)
        });
      const data = await res.json();
      if (data.success) {
        toast.success("Form submitted successfully!")
      } else { toast.error("Error submitting form") }
    } catch (error) {
      toast.error("Error submitting form")
    }
    reset();
  };

  const onSubmit = (data) => {
    const templateParams = {
      subject: data.subject,
      name: data.name,
      email: data.email,
      message: data.message,
    };

    setLaunch("rocket"); // start rocket phase
    sendEmail(templateParams);
  };

  return (
    <>
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full h-full py-6 px-12 max-w-xl flex-col items-center justify-center space-y-4"
      >
        {/* <motion.div variants={item} className="w-full">
          <h2 className="text-[2em] text-amethyst-neon">Message Me</h2>
        </motion.div> */}

        <motion.div variants={item} className="w-full">
          <label htmlFor="name" className="sr-only">Full Name</label>
          <motion.input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            {...register('name', {
              required: 'This field is required!',
              minLength: {
                value: 3,
                message: 'Name should be atleast 3 characters long.',
              },
            })}
            className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 hover:shadow-[0_0_15px_#5c0099]"
          />
        </motion.div>
        {errors.name && (
          <span className="inline-block self-start text-accent">
            {errors.name.message}
          </span>
        )}
        <motion.div variants={item} className="w-full">
          <label htmlFor="email" className="sr-only">Email</label>
          <motion.input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: 'This field is required!' })}
            className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 hover:shadow-[0_0_15px_#5c0099]"
          />
        </motion.div>
        {errors.email && (
          <span className="inline-block self-start text-accent">
            {errors.email.message}
          </span>
        )}
        <motion.div variants={item} className="w-full">
          <label htmlFor="subject" className="sr-only">Subject</label>
          <motion.input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            {...register('subject', { required: 'This field is required!' })}
            className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 hover:shadow-[0_0_15px_#5c0099]"
          />
        </motion.div>
        {errors.subject && (
          <span className="inline-block self-start text-accent">
            {errors.subject.message}
          </span>
        )}
        <motion.div variants={item} className="w-full">
          <label htmlFor="message" className="sr-only">Message</label>
          <motion.textarea
            id="message"
            name="message"
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
            className="custom-bg-2 w-full rounded-md p-2 text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 hover:shadow-[0_0_15px_#5c0099]"
          />
        </motion.div>
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}
        {/* <motion.input
          variants={item}
          value="Cast your message!"
          className="cursor-pointer py-2.5 px-3 rounded-md border border-ember-neon bg-yellow-400/10 backdrop-blur-md  text-[#ff6d05] hover:shadow-[inset_0_4px_12px_rgba(251,191,36,0.25)]"
          type="submit"
        /> */}

        <AnimatePresence mode="wait">
          {!launch ? (
            <motion.input
              key="submit"
              type="submit"
              value="SEND MESSAGE!"
              className="cursor-pointer py-1.5 px-5 rounded-full custom-bg-abt text-shadow-neon-light-orange font-semibold tracking-wide shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ) : launch === "rocket" ? (
            <motion.div
              key="rocket"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ x: 400, opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeIn" }}
              className="relative flex flex-col items-center"
              onAnimationComplete={() => setLaunch("check")}
            >
              {/* 🚀 Rocket Body */}
              <motion.div
                initial={{ x: 0, rotate: 90 }}
                animate={{
                  x: [0, -2, 0, 2, 0],
                }}
                transition={{ duration: 0.4, repeat: 3 }}
                className="relative w-8 h-16 bg-gradient-to-b from-gray-200 to-gray-500 rounded-full border border-white shadow-lg"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 
                border-l-[16px] border-r-[16px] border-b-[20px] 
                border-l-transparent border-r-transparent border-b-gray-400" />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-400 border border-white shadow-md" />
                <div className="absolute -bottom-2 -left-3 w-4 h-4 bg-red-500 rotate-45 rounded-sm shadow-md" />
                <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-red-500 -rotate-45 rounded-sm shadow-md" />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-full blur-md"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.8, 0.4, 0], scale: [1, 1.2, 0.9], y: [0, 60, 120] }}
                transition={{ duration: 2.4, ease: "easeOut" }}
                className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-40 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent blur-xl rounded-full"
              />
            </motion.div>
          ) : (
            <motion.div
              key="checkmark"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-[#ff6d05] text-2xl shadow-[0_0_15px_#00ff9d]"
              onAnimationComplete={() => {
                setTimeout(() => setLaunch(false), 2000); // show for 2 seconds
              }}
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </>
  );
}
