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
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
tmpObjPropValue_2 = () => {
  {
    let tmpStmtArg = $(1);
    return tmpStmtArg;
  }
};
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpComplexMemberObj.c();
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
tmpObjPropValue_2 = () => {
  let tmpStmtArg = $(1);
  return tmpStmtArg;
};
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpComplexMemberObj.c();
`````
