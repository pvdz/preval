# Preval test case

# ident_nested_complex_member_assigns1.md

> Normalize > Expressions > Statement > Param default > Ident nested complex member assigns1
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };
let c = 3;
function f() {
  $(b).x = $(b).x =  c
}
f();
$(100);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(b).x = $(b).x = c;
};
let b = { x: 1 };
let c = 3;
f();
$(100);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpAssignMemLhsObj = $(b);
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  return undefined;
};
let b = { x: 1 };
let c = 3;
f();
$(100);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpAssignMemLhsObj = $(b);
const varInitAssignLhsComputedObj = $(b);
varInitAssignLhsComputedObj.x = 3;
tmpAssignMemLhsObj.x = 3;
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
