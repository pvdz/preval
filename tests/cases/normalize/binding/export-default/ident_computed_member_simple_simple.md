# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > export-default > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3;
export let a = b[$('x')] = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let b = { x: 2 };
let c = 3;
export let a = ((tmpAssignComMemLhsObj = b), (tmpAssignComMemLhsProp = $('x')), (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = c));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let b = { x: 2 };
export let a = ((tmpAssignComMemLhsObj = b), (tmpAssignComMemLhsProp = $('x')), (tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 3));
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
