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
a = 10;
b = [];
c = 30;
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(b);
const tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = 10;
b = [];
c = 30;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(b);
const tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
