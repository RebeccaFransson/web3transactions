"use client";
import { TextButton } from "./button";
import { CopyIcon } from "./icons/copy";

export const Contact = () => {
  return (
    <div className="flex gap-1 md:gap-10 justify-between flex-wrap sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700">
      <div className="flex gap-1">
        <span className="font-normal text-sm">{process.env.PHONE_NUMBER}</span>
        <TextButton
          small
          className="stroke-pink-900 hover:bg-white-transparent"
          onClick={() => {
            if (process.env.PHONE_NUMBER)
              navigator.clipboard.writeText(process.env.PHONE_NUMBER);
          }}
        >
          <CopyIcon small />
        </TextButton>
      </div>
      <div className="flex gap-1">
        <span className="font-normal text-sm">{process.env.EMAIL_ADDRESS}</span>
        <TextButton
          small
          className="stroke-pink-900 hover:bg-white-transparent"
          onClick={() => {
            if (process.env.EMAIL_ADDRESS)
              navigator.clipboard.writeText(process.env.EMAIL_ADDRESS);
          }}
        >
          <CopyIcon small />
        </TextButton>
      </div>
    </div>
  );
};
