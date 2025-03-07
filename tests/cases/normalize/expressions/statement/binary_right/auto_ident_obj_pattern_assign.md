# Preval test case

# auto_ident_obj_pattern_assign.md

> Normalize > Expressions > Statement > Binary right > Auto ident obj pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(100) + ({ x, y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpObjLitVal /*:unknown*/ = $(3);
const tmpObjLitVal$1 /*:unknown*/ = $(4);
const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
tmpBinBothLhs + tmpNestedAssignObjPatternRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpObjLitVal, tmpObjLitVal$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
tmpBinBothLhs + { x: tmpObjLitVal, y: tmpObjLitVal$1 };
$({ a: 999, b: 1000 }, tmpObjLitVal, tmpObjLitVal$1);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(100) + ({ x: x, y: y } = { x: $(3), y: $(4) });
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x, y);
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
a + d;
const e = {
  a: 999,
  b: 1000,
};
$( e, b, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
