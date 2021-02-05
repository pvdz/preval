# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = [], b = 20, c = 30;
$($(a).length = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = [];
b = 20;
c = 30;
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(a);
let tmpNestedAssignPropRhs;
b = c;
tmpNestedAssignPropRhs = c;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = [];
b = 20;
c = 30;
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(a);
let tmpNestedAssignPropRhs;
b = c;
tmpNestedAssignPropRhs = c;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.length = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
