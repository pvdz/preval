# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > statement > param_default > auto_ident_nested_complex_member_assigns
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

## Normalized

`````js filename=intro
function f() {
  const tmpAssignMemLhsObj = $(b);
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
}
let b = { x: 1 };
let c = 3;
f();
$(100);
`````

## Output

`````js filename=intro
function f() {
  const tmpAssignMemLhsObj = $(b);
  const varInitAssignLhsComputedObj = $(b);
  varInitAssignLhsComputedObj.x = 3;
  tmpAssignMemLhsObj.x = 3;
}
let b = { x: 1 };
f();
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

Normalized calls: Same

Final output calls: Same