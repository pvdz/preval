# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
a = {};
b = 20;
c = 30;
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(a);
let tmpNestedAssignPropRhs;
b = c;
tmpNestedAssignPropRhs = c;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
