# Preval test case

# nested_complex_c.md

> normalize > assignment > nested_complex_c
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = [];
$(a = b = $(c).length);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpMemberComplexObj;
a = 10;
b = 20;
c = [];
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs_1 = tmpMemberComplexObj.length;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
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
var tmpNestedComplexRhs_1;
var tmpMemberComplexObj;
a = 10;
b = 20;
c = [];
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs_1 = tmpMemberComplexObj.length;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````
