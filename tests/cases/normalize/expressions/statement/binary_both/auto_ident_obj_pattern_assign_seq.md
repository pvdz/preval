# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Binary both > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })) +
  ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
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
const tmpNestedAssignObjPatternRhs /*:object*/ /*truthy*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 /*:object*/ /*truthy*/ = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpObjLitVal$3, tmpObjLitVal$5);
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
({ x: tmpObjLitVal, y: tmpObjLitVal$1 } + { x: tmpObjLitVal$3, y: tmpObjLitVal$5 });
$({ a: 999, b: 1000 }, tmpObjLitVal$3, tmpObjLitVal$5);
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
e + f;
const g = {
  a: 999,
  b: 1000,
};
$( g, c, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs = undefined;
$(x);
$(y);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
const tmpNestedAssignObjPatternRhs$1 = { x: tmpObjLitVal$3, y: tmpObjLitVal$5 };
x = tmpNestedAssignObjPatternRhs$1.x;
y = tmpNestedAssignObjPatternRhs$1.y;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x, y);
`````


## Todos triggered


None


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
 - 9: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
