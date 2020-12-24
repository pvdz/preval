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
var tmpObj;
var tmpObj_1;
const obj = { a: { b: { c: () => $(1) } } };
tmpObj_1 = obj.a;
tmpObj = tmpObj_1.b;
tmpObj.c();
`````

## Output

`````js filename=intro
var tmpObj;
var tmpObj_1;
const obj = { a: { b: { c: () => $(1) } } };
tmpObj_1 = obj.a;
tmpObj = tmpObj_1.b;
tmpObj.c();
`````
