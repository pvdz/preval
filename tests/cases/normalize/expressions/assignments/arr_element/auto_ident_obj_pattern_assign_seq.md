# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })) +
    (a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) }))
);
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
$(tmpObjLitVal);
$(tmpObjLitVal$1);
const tmpObjLitVal$3 /*:unknown*/ = $(3);
const tmpObjLitVal$5 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 /*:object*/ = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignObjPatternRhs$1, tmpObjLitVal$3, tmpObjLitVal$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
$(tmpObjLitVal);
$(tmpObjLitVal$1);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
$(tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1);
$(tmpNestedAssignObjPatternRhs$1, tmpObjLitVal$3, tmpObjLitVal$5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
const e = {
  x: a,
  y: b,
};
const f = {
  x: c,
  y: d,
};
const g = e + f;
$( g );
$( f, c, d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 3
 - 6: 4
 - 7: 3
 - 8: 4
 - 9: '[object Object][object Object]'
 - 10: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
