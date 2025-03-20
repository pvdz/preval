# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Binary right > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(100) + (a = { x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$(tmpBinBothLhs + tmpNestedAssignObjPatternRhs);
$(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 3 );
const c = $( 4 );
const d = {
  x: b,
  y: c,
};
const e = a + d;
$( e );
$( d, b, c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: '100[object Object]'
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
