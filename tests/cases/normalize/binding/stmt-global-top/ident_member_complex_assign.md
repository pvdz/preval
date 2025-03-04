# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-global-top > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let b = {x: 2}, c = 3, d = 4;
let a = $(b).x = $(c).y = $(d);
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 2 },
  c = 3,
  d = 4;
let a = ($(b).x = $(c).y = $(d));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 2 };
let c = 3;
let d = 4;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
$(a, b, c, d);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
varInitAssignLhsComputedObj$1.y = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$1;
$(varInitAssignLhsComputedRhs$1, b, 3, 4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
const c = $( 3 );
const d = $( 4 );
c.y = d;
b.x = d;
$( d, a, 3, 4 );
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
