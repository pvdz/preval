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
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpMemberComplexObj;
tmpObjPropValue_1 = () => {
  {
    let tmpStmtArg = $(1);
    return tmpStmtArg;
  }
};
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpMemberComplexObj.b();
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpMemberComplexObj;
tmpObjPropValue_1 = () => {
  let tmpStmtArg = $(1);
  return tmpStmtArg;
};
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpMemberComplexObj = obj.a;
tmpMemberComplexObj.b();
`````
