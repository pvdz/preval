# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = {};
$(a = b = $(c).x);
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
c = {};
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs$1 = tmpMemberComplexObj.x;
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
c = {};
tmpMemberComplexObj = $(c);
tmpNestedComplexRhs$1 = tmpMemberComplexObj.x;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
