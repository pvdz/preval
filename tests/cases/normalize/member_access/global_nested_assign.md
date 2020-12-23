# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpObj;
var tmpObj_1;
const obj = { a: { b: $() } };
((tmpObj = obj.a), tmpObj).b = 15;
$(((tmpObj_1 = obj.a), tmpObj_1).b);
`````

## Output

`````js filename=intro
var tmpObj;
var tmpObj_1;
const obj = { a: { b: $() } };
((tmpObj = obj.a), tmpObj).b = 15;
$(((tmpObj_1 = obj.a), tmpObj_1).b);
`````
