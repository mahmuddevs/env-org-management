"use client";

import { FaDonate, FaHandsHelping } from "react-icons/fa";
import VolunteerApplyModal from "./VolunteerApplyModal";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ApplyAsVolunteer } from "@/actions/events/VolunteerActions";
import Swal from "sweetalert2";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";

export type FormValues = {
  name: string;
  email: string;
  description: string;
};

const EventButtons = ({ eventId }: { eventId: string }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleApplyButton = () => {
    if (!user) {
      redirect("/login");
    }
    if (user?.userType !== "volunteer") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please Login As A Volunteer",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    modalRef.current?.showModal();
  };

  const handleDonateButton = () => {
    if (!user) {
      redirect("/login");
    }
    if (user?.userType !== "donor") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please Login As A Donor",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    modalRef.current?.showModal();
  };

  const onSubmit = async (data: FormValues) => {
    const { success, message } = await ApplyAsVolunteer({ eventId, ...data });

    if (!success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
    modalRef?.current?.close();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button
          className="btn bg-emerald-600 text-white w-full sm:w-auto"
          onClick={handleApplyButton}
        >
          <FaHandsHelping className="mr-2" />
          Apply As Volunteer
        </button>

        <button
          onClick={handleDonateButton}
          className="btn btn-error text-white w-full sm:w-auto"
        >
          <FaDonate className="mr-2" />
          Donate
        </button>
      </div>

      <VolunteerApplyModal
        modalRef={modalRef}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
    </div>
  );
};

export default EventButtons;
