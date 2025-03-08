# Preval test case

# ident_upd_pi_complex1.md

> Normalize > Expressions > Statement > For b > Ident upd pi complex1
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };
$($(b).x += 1);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:primitive*/ = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $({ x: 1 });
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedObj.x + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
$(($(b).x += 1));
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
const varInitAssignLhsComputedObj = $(b);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b.x;
const d = c + 1;
b.x = d;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
