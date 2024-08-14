export type EarningFormData = {
  amount: number;
  description?: string;
  category: string | null;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type userData = {
  id: string;
  balance: number;
  spendings: number;
  earnings: number;
  savings: number;
  currency: string;
};
// model Category {
//     id          String        @default(uuid()) @unique
//     name        String        @unique
//     emoji       String
//     createdAt   DateTime      @default(now())
//     updatedAt   DateTime      @updatedAt
//     userId      String
//     user        User          @relation(fields: [userId], references: [id])
//     transactions Transaction[]
//   }
