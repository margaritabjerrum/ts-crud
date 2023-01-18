export type StringifiedObject<Type extends object> = {
  [Key in keyof Type]: string
};

const stringifyProps = <Type extends object>(object: Type): StringifiedObject<Type> => {
  const objectLikeArray = Object.entries(object);

  const objectWithPropsStringified = objectLikeArray.reduce<Partial<StringifiedObject<Type>>>((
    prevObj,
    [key, value],
  ) => ({
    ...prevObj,
    [key]: String(value),
  }), {});

  return objectWithPropsStringified as StringifiedObject<Type>;
};

export default stringifyProps;
