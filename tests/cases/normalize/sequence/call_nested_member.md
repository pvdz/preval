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
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_2 = () => {
  {
    let tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj_1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj_1.b;
tmpMemberComplexObj.c();
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
tmpObjPropValue_2 = () => {
  let tmpReturnArg = $(1);
  return tmpReturnArg;
};
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj_1 = obj.a;
tmpMemberComplexObj = tmpMemberComplexObj_1.b;
tmpMemberComplexObj.c();
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
