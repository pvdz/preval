# Preval test case

# nested_complex_b.md

> normalize > assignment > nested_complex_b
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = [], c = 30;
$(a = $(b).length = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
a = 10;
b = [];
c = 30;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.length = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
a = 10;
b = [];
c = 30;
tmpNestedAssignObj = $(b);
tmpNestedAssignObj.length = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
 - 1: 30
 - 2: undefined

Normalized calls: Same

Final output calls: Same
