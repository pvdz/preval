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
var tmpMemberComplexObj;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = () => {
  let tmpReturnArg = $(1);
  return tmpReturnArg;
};
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpMemberComplexObj.b();
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = () => {
  let tmpReturnArg = $(1);
  return tmpReturnArg;
};
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpMemberComplexObj.b();
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
