import { UserData } from "@/types/user";

export const USER_DATA: UserData[] = [
  {
    id: "user1",
    username: "User1",
    isBlocked: true,
    moderationComments: "",
    blockHistory: [
      {
        action: "block",
        date: "2025-03-15",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque. Quisque vel faucibus tellus. Praesent sed tempus nibh, ut dapibus risus. Praesent velit turpis, dapibus vel tristique eget.",
      },
    ],
  },
  {
    id: "user2",
    username: "User2",
    isBlocked: false,
    moderationComments: "",
    blockHistory: [
      {
        action: "block",
        date: "2025-02-10",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum, mi maximus ornare semper, nunc lorem finibus mauris, ac bibendum diam ante et leo. Donec porttitor justo vitae est molestie iaculis. Sed placerat velit odio, et pretium enim placerat eget. Praesent rutrum libero in arcu tincidunt laoreet. Suspendisse fermentum, nunc nec porta hendrerit, lorem urna iaculis urna, nec viverra ligula mauris a neque. Quisque vel faucibus tellus. Praesent sed tempus nibh, ut dapibus risus. Praesent velit turpis, dapibus vel tristique eget.",
      },
      {
        action: "unblock",
        date: "2025-02-25",
        comment: "Пользователь обещал соблюдать правила",
      },
    ],
  },
  {
    id: "user3",
    username: "User3",
    isBlocked: false,
    moderationComments: "",
    blockHistory: [],
  },
];
