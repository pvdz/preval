# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Compound > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a *= { x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const a /*:object*/ = { a: 999, b: 1000 };
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpClusterSSA_a /*:number*/ = a * tmpNestedAssignObjPatternRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, tmpObjLitVal, tmpObjLitVal$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpClusterSSA_a = { a: 999, b: 1000 } * { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, tmpObjLitVal, tmpObjLitVal$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
const d = {
  x: a,
  y: b,
};
const e = c * d;
$( e );
$( e, a, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: NaN
 - 4: NaN, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
