import { getUserById } from "@/app/api/store/user";
import OrderItem from "@/components/orders/order-item";
import ProfileMenuDrawer from "@/components/profile/profile-menu-drawer";
import { verifyAuth } from "@/lib/auth";
import Loading from "@/lib/loading";
import Link from "next/link";

export default async function ProfilePage() {
  let userdata;
  const { user } = await verifyAuth();
  if (user) {
    userdata = await getUserById(user.id);
  }

  return (
    <>
      {user ? (
        <>
          <ProfileMenuDrawer user={userdata} />
          <div className="flex flex-col md:flex-row p-5 my-5 w-full min-h-[400px]">
            <div className="mb-9 md:mb-0 flex flex-col w-full  text-center">
              <span className="font-[400] text-4xl mb-10 text-transform: uppercase">
                BUNA, {userdata.second_name}
              </span>
              <div className="lg:mx-5 lg:flex lg:flex-row">
                <div className="flex flex-col  sm:mb-10 md:mb-0  w-full lg:w-1/2">
                  <div className="flex items-center  w-full">
                    <span className="mr-2 ml-4">COMENZI RECENTE</span>
                    <span className="mx-2 text-lg text-[rgb(0,0,0,0.4)] font-[100]">
                      |
                    </span>
                    <Link
                      href="/orders"
                      className="text-[12px] font-[100] text-[rgb(0,0,0,0.4)]"
                    >
                      VEZI TOATE COMENZILE
                    </Link>
                  </div>
                  <OrderItem userId={user.id} mode="first" />
                </div>

                <div className="flex flex-col mt-[3rem]  border rounded-sm h-fit  py-5 px-4 lg:mx-5 lg:w-1/2">
                  <span className="text-start mb-[1.4rem]">
                    INFORMATIILE MELE
                  </span>
                  <div className="flex">
                    <span>
                      NUME:{" "}
                      <span className="text-[rgb(0,0,0,0.4)] mx-1">
                        {userdata.second_name}
                        <span className="text-[rgb(0,0,0,0.4)] ml-1">
                          {userdata.first_name}
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="flex">
                    <span>
                      EMAIL:{" "}
                      <span className="ml-1 text-[rgb(0,0,0,0.4)]">
                        {" "}
                        {userdata.email}
                      </span>
                    </span>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
