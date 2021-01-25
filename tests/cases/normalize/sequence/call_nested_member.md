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
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = () => {
  let tmpReturnArg = $(1);
  return tmpReturnArg;
};
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj$1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj$1.b;
tmpMemberComplexObj.c();
`````

## Output

`````js filename=intro
var tmpMemberComplexObj;
var tmpMemberComplexObj$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = () => {
  let tmpReturnArg = $(1);
  return tmpReturnArg;
};
tmpObjPropValue$1 = { c: tmpObjPropValue$2 };
tmpObjPropValue = { b: tmpObjPropValue$1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj$1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj$1.b;
tmpMemberComplexObj.c();
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
