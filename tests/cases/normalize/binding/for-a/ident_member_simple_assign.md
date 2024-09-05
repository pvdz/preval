# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > For-a > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
for (let a = b.x = $(c).y = $(d);false;) $(a, b, c);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3,
  d = 4;
{
  let a$1 = (b.x = $(c).y = $(d));
  while (false) {
    $(a$1, b, c);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## Output


`````js filename=intro
const varInitAssignLhsComputedObj = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
