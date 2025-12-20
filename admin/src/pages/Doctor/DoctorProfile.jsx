import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editProfile, setEditProfile] = useState(null); // local editable copy

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setEditProfile(profileData); // initialize local copy
    }
  }, [profileData]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: editProfile.address,
        fees: editProfile.fees,
        available: editProfile.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!editProfile) return null;

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
            src={editProfile.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {editProfile.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {editProfile.degree} - {editProfile.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {editProfile.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3 ">
              About:{" "}
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {editProfile.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fees :{" "}
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setEditProfile((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  value={editProfile.fees}
                />
              ) : (
                editProfile.fees
              )}
            </span>
          </p>

          <div className="flex gap-2 py-2">
            <p>Address: </p>
            <p className="text-sm">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={editProfile.address.line1}
                  />
                  <br />
                  <input
                    type="text"
                    onChange={(e) =>
                      setEditProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={editProfile.address.line2}
                  />
                </>
              ) : (
                <>
                  {editProfile.address.line1}
                  <br />
                  {editProfile.address.line2}
                </>
              )}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input
              onChange={() =>
                isEdit &&
                setEditProfile((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={editProfile.available}
              type="checkbox"
              name=""
              id=""
              disabled={!isEdit}
            />
            <label htmlFor="">Available</label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
