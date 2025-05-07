# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident obj pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = { x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
} else {
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $($(100));
  $({ a: 999, b: 1000 }, 1, 2);
} else {
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  $(tmpNestedAssignObjPatternRhs);
  $(tmpNestedAssignObjPatternRhs, tmpObjLitVal, tmpObjLitVal$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 100 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, 1, 2 );
}
else {
  const d = $( 3 );
  const e = $( 4 );
  const f = {
    x: d,
    y: e,
  };
  $( f );
  $( f, d, e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 3
 - 3: 4
 - 4: { x: '3', y: '4' }
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
