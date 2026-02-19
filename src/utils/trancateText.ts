export const trancateText = (
  text: string | null | undefined,
  maxLength: number = 10,
) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + "...";
};
