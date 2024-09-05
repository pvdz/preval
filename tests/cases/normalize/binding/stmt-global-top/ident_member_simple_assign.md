# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-global-top > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = b.x = $(c).y = $(d);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = (b.x = $(c).y = $(d));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b, c);
`````

## Output


`````js filename=intro
const varInitAssignLhsComputedObj = $(3);
const varInitAssignLhsComputedRhs$1 = $(4);
varInitAssignLhsComputedObj.y = varInitAssignLhsComputedRhs$1;
const b = { x: varInitAssignLhsComputedRhs$1 };
$(varInitAssignLhsComputedRhs$1, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
const c = { x: b };
$( b, c, 3 );
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
