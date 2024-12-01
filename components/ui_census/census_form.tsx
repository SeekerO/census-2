import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoLocationSharp, IoPeopleSharp, IoPerson } from "react-icons/io5";
import { FaFileAlt, FaBuilding } from "react-icons/fa";
import { MdYard, MdOutlinePets } from "react-icons/md";
import CensusMemberForm from "./census_member_form";
import CensusApartment from "./census_apartment_form";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { set } from "react-hook-form";


const CensusForm = ({ formData, setFormData, edit, setEdit, memberForm, setMemberForm,
    setSelectedUser,
}: {
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>, memberForm: any, setMemberForm: React.Dispatch<React.SetStateAction<any>>, formData: any, setFormData: React.Dispatch<React.SetStateAction<any>>, edit: boolean, setEdit: React.Dispatch<React.SetStateAction<any>>
}) => {
    const [minimizeForm, setMinimizeForm] = useState<boolean>(false);


    const saveMemberFormData = () => {
        const { FirstName, LastName, FamilyRelationship, Birthday, Gender, CivilStatus } =
            memberForm;
        const check =
            FirstName.trim() !== "" &&
            LastName.trim() !== "" &&
            FamilyRelationship.trim() !== "" &&
            Birthday.trim() !== "" &&
            Gender.trim() !== "" &&
            CivilStatus.trim() !== "";

        if (!check) {
            alert("Fill  data");
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                FamMember: [...prevState.FamMember, memberForm], // Add the new member to the members array
            }));
            setMemberForm({
                MemberId: "",
                FirstName: "",
                LastName: "",
                MiddleName: "",
                Suffix: "",
                FamilyRelationship: "",
                Birthday: "",
                Age: 0,
                Gender: "",
                CivilStatus: "",
                Occupation: { value: "", other: "" },
                Eduction: { elem: false, hs: false, college: false, other: false },
                Religion: { value: "", other: "" },
                Sector: { src: false, sp: false, fourps: false, },
                Lactating: false,
                LactatingMonths: 0,
                Immunization: "",
                Disability: "",
                Weight: "",
                Height: "",
            });
        }
    };

    const handleShowMemberInformation = (member: any) => {
        setMinimizeForm(true)
        setSelectedUser(member)
    }

    return <>
        <div className="flex flex-col gap-2 px-2">

            <label>Census ID: {formData.HouseProfileId}</label>
            {formData.AgentId !== "" && <label>By: {formData.AgentId}</label>}
            <label>Date: {moment(formData.created_at).format('LL')}</label>

            <div className="mt-5 flex flex-col gap-3 text-[1.6vh] ">

                <div className="flex w-full gap-2 items-center">
                    <label className="font-semibold tracking-wider">
                        FAMILY MEMBERS NO:
                    </label>
                    <label className="text-white  h-fit w-fit rounded">
                        {formData.FamMember.length}
                    </label>
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        HOUSE CONTACT NO:
                    </label>
                    <input
                        value={formData.ContactNumber}
                        type="text"
                        disabled={edit}
                        name="ContactNumber"
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                ContactNumber: e.target.value,
                            }))
                        }
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>
                <h1 className="font-semibold items-center gap-2 flex text-[1.2rem]">
                    <IoLocationSharp /> LOCATION
                </h1>
                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        HOUSE NO:
                    </label>
                    <input
                        value={formData.HouseNumber}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                HouseNumber: e.target.value,
                            }))
                        }
                        name="HouseNumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>
                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        STREET:
                    </label>
                    <input
                        value={formData.Location.Street}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location: [
                                    {
                                        ...prev.Location, // Preserve other properties of the first Location object
                                        Street: e.target.value, // Update only the Street property
                                    }
                                ],
                            }))
                        }
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2  ">
                    <label className="font-semibold tracking-wider">
                        SUBD:
                    </label>
                    <input
                        value={formData.Location?.SubdivisionName}
                        type="text"
                        disabled={edit}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location: [
                                    {
                                        ...prev.Location, // Preserve other properties of the first Location object
                                        SubdivisionName: e.target.value, // Update only the Street property
                                    },
                                ],
                            }))
                        }
                        name="housenumber"
                        className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label className="font-semibold tracking-wider">KM:</label>
                    <Select
                        disabled={edit}
                        name="Kilometer"
                        value={formData.Location.Kilometer}
                        onValueChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                Location: {
                                    ...prev.Location, // Preserve other properties of Location
                                    Kilometer: e, // Update only the Kilometer property
                                },
                            }))
                        }
                    >
                        <SelectTrigger className="w-full py-2 rounded">
                            <SelectValue placeholder="Choose Kilometer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="37">37</SelectItem>
                            <SelectItem value="38">38</SelectItem>
                            <SelectItem value="39">39</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="OTHER">OTHER</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                {formData.Location[0]?.SubdivisionName !== "" && <>
                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            BLOCK:
                        </label>
                        <input
                            value={formData?.Location.Block}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location: [
                                        {
                                            ...prev.Location, // Preserve other properties of the first Location object
                                            Block: e.target.value, // Update only the Street property
                                        },
                                    ],
                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            LOT:
                        </label>
                        <input
                            value={formData?.Location?.Lot}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location: [
                                        {
                                            ...prev.Location, // Preserve other properties of the first Location object
                                            Lot: e.target.value, // Update only the Street property
                                        },
                                    ],
                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2  ">
                        <label className="font-semibold tracking-wider">
                            PHASE:
                        </label>
                        <input
                            value={formData?.Location?.Phase}
                            type="text"
                            disabled={edit}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Location: [
                                        {
                                            ...prev.Location, // Preserve other properties of the first Location object
                                            Phase: e.target.value, // Update only the Street property
                                        },
                                    ],
                                }))
                            }
                            name="housenumber"
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-full rounded"
                        />
                    </div>
                </>}

                <h1
                    onClick={() => console.log(formData)}
                    className="font-semibold flex items-center gap-2 text-[1.2rem] mt-5"
                >
                    <IoPeopleSharp />
                    FAMILY MEMBER
                </h1>
                <div className="flex flex-wrap gap-2 border-[1px] p-2 rounded items-center mb-3">
                    <label className="tracking-widest">MEMBERS:</label>
                    {formData?.FamMember?.map((member: any, index: number) => (
                        <div
                            onClick={() => handleShowMemberInformation(member)}
                            key={member.MemberId}
                            className="px-2 py-1 bg-slate-300 w-fit text-black rounded flex flex-col gap-2 items-center cursor-pointer hover:bg-blue-500 duration-300 hover:text-white"
                        >
                            <div>
                                {member.FirstName === "" ? "MEMBER" : member.FirstName}{" "}
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {!edit &&
                    <div>
                        <CensusMemberForm formData={formData} setFormData={setFormData} memberForm={memberForm} setMemberForm={setMemberForm} minimizeForm={minimizeForm} setMinimizeForm={setMinimizeForm} />

                        {minimizeForm && <div className="flex w-full flex-col items-center justify-center mt-2 mb-15">
                            <button
                                onClick={() => saveMemberFormData()}
                                type="button"
                                className="text-center h-[30px] bg-slate-100 text-black px-2 font-semibold rounded hover:bg-green-800 duration-300 hover:text-white"
                            >
                                ADD MEMBER
                            </button>
                        </div>}
                    </div>
                }

                <div>
                    <CensusApartment formData={formData} setFormData={setFormData} setEdit={setEdit} edit={edit} />
                </div>

                <div className="flex flex-col mt-10 gap-5">
                    <label className="text-[1.2rem] font-semibold tracking-wider flex items-center gap-2">
                        <MdYard className="text-[1.3rem]" />
                        DO YOU HAVE:
                    </label>
                    <div className="flex gap-2">
                        <label className="font-semibold tracking-wider">
                            VEGTABLE/GARDEN
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Garden"
                            checked={formData.DoYouHave?.Garden}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Garden: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            LIVESTOCK/POULTRY
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="LiveStock"
                            checked={formData.DoYouHave?.LiveStock}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, LiveStock: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            PIGGERY
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Piggery"
                            checked={formData.DoYouHave?.Piggery}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Piggery: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            FISHPOND
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Fishpond"
                            checked={formData.DoYouHave?.Fishpond}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    DoYouHave: { ...prev.DoYouHave, Fishpond: value },
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="flex flex-col mt-10 gap-5">
                    <label className="text-[1.2rem] font-semibold tracking-wider flex items-center gap-2">
                        <MdYard className="text-[1.3rem]" />
                        HOUSEHOLD USES:
                    </label>
                    <div className="flex gap-2">
                        <label className="font-semibold tracking-wider">
                            IODIZED SALT
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Iodized"
                            checked={formData.HouseHoldUses?.Iodized}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    HouseHoldUses: { ...prev.HouseHoldUses, Iodized: value },
                                }))
                            }
                        />
                    </div>

                    <div className="flex gap-2 ">
                        <label className="font-semibold tracking-wider">
                            FORTIFIED FOOD PRODUCTS
                        </label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="Fortified"
                            checked={formData.HouseHoldUses?.Fortified}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    HouseHoldUses: { ...prev.HouseHoldUses, Fortified: value },
                                }))
                            }
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-3 mt-2">
                    <label className="text-[1.2rem] font-semibold flex items-center gap-2 ">
                        <MdOutlinePets />
                        DO YOU HAVE PETS:
                    </label>

                    <div className="flex gap-2 items-center">
                        <label className="font-semibold tracking-wider">DOG</label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="dog"
                            checked={formData.Pet?.TypeofPet?.dog}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, TypeofPet: { ...prev.Pet.TypeofPet, dog: value } },
                                }))
                            }
                        />
                        <input
                            disabled={edit}
                            value={formData.Pet?.NumberofPet?.dogno}
                            type="text"
                            name="NumberofPet"
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, NumberofPet: { ...prev.Pet.NumberofPet, dogno: e.target.value } },
                                }))
                            }
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                        />
                    </div>

                    <div className="flex gap-2 items-center">
                        <label className="font-semibold tracking-wider">CAT</label>
                        <Checkbox
                            disabled={edit}
                            className="h-6 w-6 border-[1px] border-slate-100"
                            name="cat"
                            checked={formData.Pet?.TypeofPet?.cat}
                            onCheckedChange={(value: boolean) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, TypeofPet: { ...prev.Pet.TypeofPet, cat: value } },
                                }))
                            }
                        />
                        <input
                            disabled={edit}
                            value={formData.Pet?.NumberofPet?.catno}
                            type="text"
                            name="catno"
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Pet: { ...prev.Pet, NumberofPet: { ...prev.Pet.NumberofPet, catno: e.target.value } },
                                }))
                            }
                            className="text-white border-[0.5px] bg-transparent p-2 h-fit w-[100px] rounded"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg tracking-widest">OTHER PET</label>
                        <textarea
                            disabled={edit}
                            rows={2}
                            value={formData.Remarks || formData.Pet.Remarks}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Remarks: e.target.value,
                                }))
                            }
                            className="w-full rounded-md p-2 border-0"
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-10">
                        <div className="flex justify-center w-full mb-5">
                            <div className="w-[90%] h-[1px] bg-slate-800" />
                        </div>

                        <label className="text-lg tracking-widest">NOTE:</label>
                        <textarea
                            disabled={edit}
                            rows={2}
                            value={formData.Note}
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    Note: e.target.value,
                                }))
                            }
                            className="w-full rounded-md p-2 border-0"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CensusForm;