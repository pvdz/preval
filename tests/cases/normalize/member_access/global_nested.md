# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
const obj = { a: { b: $() } };
tmpComplexMemberObj = obj.a;
tmpArg = tmpComplexMemberObj.b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
const obj = { a: { b: $() } };
tmpComplexMemberObj = obj.a;
tmpArg = tmpComplexMemberObj.b;
$(tmpArg);
`````
