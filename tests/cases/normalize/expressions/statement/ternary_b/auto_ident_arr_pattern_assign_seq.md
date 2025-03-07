# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Ternary b > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(1) ? ([x, y] = ($(x), $(y), [$(3), $(4)])) : $(200);
$(a, x, y);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, x, y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let y = 2;
if ($(1)) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
} else {
  $(200);
}
$({ a: 999, b: 1000 }, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(1) ? ([x, y] = ($(x), $(y), [$(3), $(4)])) : $(200);
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
} else {
  $(200);
}
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 1 );
if (c) {
  $( 1 );
  $( 2 );
  const d = $( 3 );
  const e = $( 4 );
  a = d;
  b = e;
}
else {
  $( 200 );
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
 - 1: 1
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope