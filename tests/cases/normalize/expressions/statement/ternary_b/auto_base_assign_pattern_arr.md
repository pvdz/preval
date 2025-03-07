# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Ternary b > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(1) ? ([b] = $([$(2)])) : $(200);
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = [];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = [];
if ($(1)) {
  const tmpArrElement = $(2);
  const arrAssignPatternRhs = $([tmpArrElement]);
  b = [...arrAssignPatternRhs][0];
} else {
  $(200);
}
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(1) ? ([b] = $([$(2)])) : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
} else {
  $(200);
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = [];
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = [ c ];
  const e = $( d );
  const f = [ ...e ];
  a = f[ 0 ];
}
else {
  $( 200 );
}
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope