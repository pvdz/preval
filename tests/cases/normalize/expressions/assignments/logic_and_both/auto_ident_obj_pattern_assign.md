# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = { x, y } = { x: $(3), y: $(4) }) && (a = { x, y } = { x: $(3), y: $(4) })
);
$(a, x, y);
`````


## Settled


`````js filename=intro
$(3);
$(4);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpObjLitVal$5 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs$1 /*:object*/ = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
$(tmpNestedAssignObjPatternRhs$1);
$(tmpNestedAssignObjPatternRhs$1, tmpObjLitVal$3, tmpObjLitVal$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
$(tmpNestedAssignObjPatternRhs$1);
$(tmpNestedAssignObjPatternRhs$1, tmpObjLitVal$3, tmpObjLitVal$5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
const a = $( 3 );
const b = $( 4 );
const c = {
  x: a,
  y: b,
};
$( c );
$( c, a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpObjLitVal$3 = $(3);
  const tmpObjLitVal$5 = $(4);
  const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
  x = tmpNestedAssignObjPatternRhs$1.x;
  y = tmpNestedAssignObjPatternRhs$1.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, x, y);
} else {
  $(tmpCalleeParam);
  $(a, x, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }
 - 6: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
