export const money = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "MGA",
    maximumFractionDigits: 0,
  }).format(amount)

export const date = (value: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(value))

export const imageUrl = (
  image: string | { url: string; isDefault?: boolean }[] | undefined,
) => (typeof image === "string" ? image : image?.find((item) => item.isDefault)?.url || image?.[0]?.url || "")
