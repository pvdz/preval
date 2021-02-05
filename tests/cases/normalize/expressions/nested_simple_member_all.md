# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {x:1}, b = {x:2}, c = {x:3};
$($(a).x = $(b).x = $(c).x);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(a);
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj = $(c);
let tmpNestedAssignPropRhs$1 = tmpCompObj.x;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
tmpCalleeParam = tmpNestedPropAssignRhs$1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
a = { x: 1 };
b = { x: 2 };
c = { x: 3 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(a);
let tmpNestedAssignPropRhs;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj = $(c);
let tmpNestedAssignPropRhs$1 = tmpCompObj.x;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.x = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs$1;
tmpCalleeParam = tmpNestedPropAssignRhs$1;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '2' }
 - 3: { x: '3' }
 - 4: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
