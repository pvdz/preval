# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > export-default > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
export let a = $(b)[$('x')] = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let b = { x: 2 };
let c = 3;
let d = 4;
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  ((tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
  (tmpAssignComMemLhsProp = $('x')),
  (((tmpAssignComputedObj = tmpAssignComMemLhsObj),
  (tmpAssignComputedProp = tmpAssignComMemLhsProp),
  (tmpAssignComputedRhs = c + d),
  (tmpAssignMemLhsObj$1 = tmpAssignComputedObj)),
  (tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs))));
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
let b = { x: 2 };
export let a =
  ((tmpAssignMemLhsObj = $(b)),
  ((tmpAssignComMemLhsObj = tmpAssignMemLhsObj),
  (tmpAssignComMemLhsProp = $('x')),
  (((tmpAssignComputedObj = tmpAssignComMemLhsObj),
  (tmpAssignComputedProp = tmpAssignComMemLhsProp),
  (tmpAssignComputedRhs = 7),
  (tmpAssignMemLhsObj$1 = tmpAssignComputedObj)),
  (tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs))));
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
