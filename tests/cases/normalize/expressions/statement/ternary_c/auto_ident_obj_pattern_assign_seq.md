# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Statement > Ternary c > Auto ident obj pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(0) ? $(100) : ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
  const tmpObjLitVal /*:unknown*/ = $(3);
  const tmpObjLitVal$1 /*:unknown*/ = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, x, y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
if ($(0)) {
  $(100);
} else {
  $(1);
  $(2);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  x = tmpObjLitVal;
  y = tmpObjLitVal$1;
}
$({ a: 999, b: 1000 }, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(0) ? $(100) : ({ x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpAssignObjPatternRhs.x;
  y = tmpAssignObjPatternRhs.y;
}
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 0 );
if (c) {
  $( 100 );
}
else {
  $( 1 );
  $( 2 );
  const d = $( 3 );
  const e = $( 4 );
  a = d;
  b = e;
}
const f = {
  a: 999,
  b: 1000,
};
$( f, a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
