# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Arr element > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ x, y } = { x: $(3), y: $(4) }) + ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
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
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpObjLitVal$3 = $(3);
const tmpObjLitVal$5 = $(4);
({ x: tmpObjLitVal, y: tmpObjLitVal$1 } + { x: tmpObjLitVal$3, y: tmpObjLitVal$5 });
$({ a: 999, b: 1000 }, tmpObjLitVal$3, tmpObjLitVal$5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
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
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs = undefined;
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
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
