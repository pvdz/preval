# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > For-a > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = $(b).x = $(c).y = $(d);false;) $(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
{
  let a$1 = ($(b).x = $(c).y = $(d));
  while (false) {
    $(a$1, b, c, d);
  }
}
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## Output

`````js filename=intro
const b = { x: 2 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
