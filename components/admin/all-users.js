"use client";
import Button from "@/components/util/button";
import Title from "@/components/util/title";

export default function AllUsers({ users }) {
  return (
    <>
      <div className="flex flex-col w-full h-full p-5 min-h-[100vh]">
        <div className="py-10 px-5 bg-white  my-5 rounded-md ">
          <Title moreStyle="font-[400] ">UTILIZATORI</Title>
          <div className="relative max-w-screen overflow-x-auto my-5 md:my-10">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-[#505050] uppercase border-b">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NUME
                  </th>
                  <th scope="col" className="px-4 py-3">
                    EMAIL{" "}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    TELEFON{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className=" bg-white border-b  hover:bg-gray-50 "
                  >
                    <th scope="row" className="px-4 py-4 cursor-pointer">
                      {user.id}
                    </th>
                    <td className="px-4 py-4">
                      {user.first_name} {user.second_name}
                    </td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
