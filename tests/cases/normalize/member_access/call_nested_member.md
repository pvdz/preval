# Preval test case

# call_nested_member.md

> normalize > sequence > call_nested_member
>
> Calling a nested object structure should cache one level but not break the context

#TODO

## Input

`````js filename=intro
const obj = {a: {b: {c: () => $(1)}}};
obj.a.b.c();
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$2 = () => {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
const tmpCallObj = tmpCompObj.b;
tmpCallObj.c();
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = () => {
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
const tmpCallObj = tmpCompObj.b;
tmpCallObj.c();
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
