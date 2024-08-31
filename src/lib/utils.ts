import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 시간 유효성 검사
export const validateTimes = (
  startTime: Date | null,
  endTime: Date | null
): string | null => {
  if (startTime && endTime) {
    if (startTime >= endTime) {
      return "종료 시간은 시작 시간보다 뒤에 있어야 합니다.";
    }
  }
  return null;
};
