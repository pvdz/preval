# Preval test case

# nested_simple_member_middle.md

> Normalize > Expressions > Nested simple member middle
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = {}, c = 30;
$(a = $(b).x = c);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
(a = 10), (b = {}), (c = 30);
$((a = $(b).x = c));
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = {};
c = 30;
const tmpCallCallee = $;
const tmpNestedAssignObj = $(b);
const tmpNestedPropAssignRhs = c;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpSSA_b = {};
const tmpNestedAssignObj = $(tmpSSA_b);
tmpNestedAssignObj.x = 30;
$(30);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
