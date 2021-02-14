# Preval test case

# call_nested_member.md

> normalize > sequence > call_nested_member
>
> Calling a nested object structure should cache one level but not break the context

#TODO

## Input

`````js filename=intro
const obj = {a: {b: () => $(1)}};
obj.a.b();
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = () => {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallObj = obj.a;
tmpCallObj.b();
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = () => {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallObj = obj.a;
tmpCallObj.b();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
