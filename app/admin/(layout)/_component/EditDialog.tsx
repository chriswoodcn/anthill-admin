"use client";

import Icon from "@/components/icon";
import useEffectOnce from "@/lib/hooks/useEffectOnce";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

export default function (
  props: PropsWithChildren & {
    show: boolean;
    close: () => void;
  }
) {
  return (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog as="div" open={props.show} onClose={() => props.close()}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </TransitionChild>
        <div
          id="slidein_up_modal"
          className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
        >
          <div className="flex items-start justify-center min-h-screen px-4">
            <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full min-w-80 sm:w-3/5 lg:w-1/2 my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
              <Icon
                name="x-circle"
                className="absolute right-5 top-5 text-white-4 dark:text-black-4"
                onClick={() => props.close()}
              />
              {props.children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
