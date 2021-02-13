# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
//var a = [], b = 20, c = 30;
//$($(a).length);
$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const varInitAssignLhsComputedObj = $(a);
const varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.length = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const varInitAssignLhsComputedObj = $(a);
const varInitAssignLhsComputedRhs = b;
varInitAssignLhsComputedObj.length = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same