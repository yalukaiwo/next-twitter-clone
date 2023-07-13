import { useCurrentUser, useUser } from "@/hooks";
import useEditModal from "@/hooks/useEditModal";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import Modal from "../Modal";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id ?? "");
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage ?? "");
    setCoverImage(currentUser?.coverImage ?? "");
    setName(currentUser?.name ?? "");
    setUsername(currentUser?.username ?? "");
    setBio(currentUser?.bio ?? "");
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        coverImage,
        bio,
      });

      mutateFetchedUser();

      toast.success("Updated.");
      editModal.onClose();
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    name,
    username,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => {
          setProfileImage(image);
        }}
        label="Upload profile picture"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => {
          setCoverImage(image);
        }}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        type="text"
      />
    </div>
  );

  return (
    <Modal
      title="Edit your profile"
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
