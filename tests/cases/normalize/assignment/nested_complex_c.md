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
var tmpNestedComplexRhs$1;
var tmpMemberComplexObj;
a = 10;
b = 20;
c = [];
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs$1 = tmpMemberComplexObj.length;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
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
var tmpNestedComplexRhs$1;
var tmpMemberComplexObj;
a = 10;
b = 20;
c = [];
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs$1 = tmpMemberComplexObj.length;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: []
 - 1: 0
 - 2: undefined

Normalized calls: Same

Final output calls: Same
