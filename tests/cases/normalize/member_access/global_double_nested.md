# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
`````

## Normalized

`````js filename=intro
var tmpObj;
var tmpObj_1;
const obj = { a: { b: { c: $() } } };
$(((tmpObj = ((tmpObj_1 = obj.a), tmpObj_1).b), tmpObj).c);
`````

## Output

`````js filename=intro
var tmpObj;
var tmpObj_1;
const obj = { a: { b: { c: $() } } };
$(((tmpObj = ((tmpObj_1 = obj.a), tmpObj_1).b), tmpObj).c);
`````
