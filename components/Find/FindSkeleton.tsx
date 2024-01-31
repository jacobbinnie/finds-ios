import { View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Divider } from "react-native-elements";
import { useAuth } from "@/providers/AuthProvider";

interface FindProps {
  isProfileFind?: boolean;
  isPlaceFind?: boolean;
  findHeight: number;
}

const FindSkeleton = ({
  isProfileFind,
  isPlaceFind,
  findHeight,
}: FindProps) => {
  const router = useRouter();
  const { session } = useAuth();

  const bottomOffset = 15;
  const descriptionCardHeight = 152;
  const imageheight = findHeight - descriptionCardHeight - bottomOffset;

  // const { data: existingSave, refetch: refetchSave } = useQuery({
  //   queryKey: ["saves", "find", find.id],
  //   queryFn: async () => {
  //     if (!profile) return null;

  //     const { data, error } = await supabase
  //       .from("saves")
  //       .select("id")
  //       .eq("find", find.id)
  //       .eq("profile", profile.id);

  //     if (error) throw error;

  //     return data?.[0] ?? null;
  //   },
  // });

  return (
    <View
      style={{
        width: "100%",
        height: findHeight ?? 0,
      }}
    >
      <View
        style={{
          display: "flex",
          position: "relative",
          flex: 1,
          marginBottom: bottomOffset,
          borderRadius: 10,
          overflow: "hidden",
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <View
          style={{
            display: isProfileFind ? "none" : "flex",
            position: "absolute",
            zIndex: 10,
            top: 15,
            left: 15,
            backgroundColor: Colors.light,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: 100,
              height: 20,
              backgroundColor: Colors.light,
              borderRadius: 99,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: Colors.grey,
            height: imageheight,
            width: "100%",
          }}
        />

        <View
          style={{
            width: 45,
            height: 45,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.light,
            borderRadius: 99,
            position: "absolute",
            right: 15,
            top: 15,
          }}
        />

        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingHorizontal: 15,
            backgroundColor: "#FFF",
            borderEndStartRadius: 10,
            borderEndEndRadius: 10,
            overflow: "hidden",
            height: descriptionCardHeight,
          }}
        >
          <View style={{ gap: 5, paddingVertical: 15 }}>
            {!isPlaceFind && (
              <View
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 150,
                    height: 20,
                    borderRadius: 99,
                    backgroundColor: Colors.light,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    gap: 5,
                    maxWidth: "75%",
                  }}
                >
                  <View
                    style={{
                      width: 190,
                      height: 20,
                      borderRadius: 99,
                      backgroundColor: Colors.light,
                    }}
                  />
                </View>
              </View>
            )}
            <View style={{ flexDirection: "row", gap: 5 }}>
              <View
                style={{
                  width: 75,
                  height: 20,
                  borderRadius: 99,
                  backgroundColor: Colors.light,
                }}
              />
              <View
                style={{
                  width: 160,
                  height: 20,
                  borderRadius: 99,
                  backgroundColor: Colors.light,
                }}
              />
              <View
                style={{
                  flex: 1,
                  height: 20,
                  borderRadius: 99,
                  backgroundColor: Colors.light,
                }}
              />
            </View>
          </View>

          <Divider />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                height: 20,
                width: 100,
                borderRadius: 99,
                backgroundColor: Colors.light,
              }}
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 80,
                  borderRadius: 99,
                  backgroundColor: Colors.light,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FindSkeleton;
