interface Props {
  params: Record<string, string | number | undefined>;
}

/**
 * Обогощает URL query-параметрами для запроса
 * ?key1=value1 &key2=value2 &key3=value3
 */
export function addParamsToUrl({ params }: Props) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== "");

  let url = "";
  entries.forEach(([key, value], idx) => {
    url += idx === 0 ? `?${key}=${value}` : `&${key}=${value}`;
  });

  return url;
}
