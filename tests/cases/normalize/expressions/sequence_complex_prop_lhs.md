# Preval test case

# sequence_complex_prop_lhs.md

> Normalize > Expressions > Sequence complex prop lhs
>
> An assignment with rhs of a property on a sequence that ends with a complex node

Relevant for intermediate artifacts.

## Input

`````js filename=intro
let a = 0, b = 1, c = {x: {y: 10}};
a = ((b = c.x), $(b)).y === 'Identifier';
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = { y: 10 };
const tmpCompObj /*:unknown*/ = $(tmpObjLitVal);
const tmpBinLhs /*:unknown*/ = tmpCompObj.y;
const tmpClusterSSA_a /*:boolean*/ = tmpBinLhs === `Identifier`;
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ y: 10 }).y === `Identifier`);
`````

## Pre Normal


`````js filename=intro
let a = 0,
  b = 1,
  c = { x: { y: 10 } };
a = ((b = c.x), $(b)).y === `Identifier`;
$(a);
`````

## Normalized


`````js filename=intro
let a = 0;
let b = 1;
const tmpObjLitVal = { y: 10 };
let c = { x: tmpObjLitVal };
b = c.x;
const tmpCompObj = $(b);
const tmpBinLhs = tmpCompObj.y;
a = tmpBinLhs === `Identifier`;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 10 };
const b = $( a );
const c = b.y;
const d = c === "Identifier";
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '10' }
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
