# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > For-a > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
for (let a = $(b).x = c;false;) $(a, b, c);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
varInitAssignLhsComputedObj.x = 3;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({ x: 2 });
varInitAssignLhsComputedObj.x = 3;
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = { x: 2 },
  c = 3;
{
  let a$1 = ($(b).x = c);
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
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedRhs = c;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
const b = $( a );
b.x = 3;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
