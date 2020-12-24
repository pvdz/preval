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
var tmpObj;
const obj = { a: { b: $() } };
tmpObj = obj.a;
tmpArg = tmpObj.b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObj;
const obj = { a: { b: $() } };
tmpObj = obj.a;
tmpArg = tmpObj.b;
$(tmpArg);
`````
