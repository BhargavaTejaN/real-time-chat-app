/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const inputRef = useRef();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No search user found!");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="search..."
        className="input input-bordered rounded-full outline-none border-none hover:outline-none hover:border-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
