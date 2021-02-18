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
const varInitAssignLhsComputedObj = $(a);
b = c;
let varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.length = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var b;
const a = [];
const varInitAssignLhsComputedObj = $(a);
varInitAssignLhsComputedObj.length = 30;
$(30);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
