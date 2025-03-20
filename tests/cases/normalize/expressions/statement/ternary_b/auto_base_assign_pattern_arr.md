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
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
  $(a, tmpClusterSSA_b);
} else {
  $(200);
  const b /*:array*/ = [];
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const arrAssignPatternRhs = $([tmpArrElement]);
  $(a, [...arrAssignPatternRhs][0]);
} else {
  $(200);
  $(a, []);
}
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
  $(a, b);
} else {
  $(200);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  const d = [ c ];
  const e = $( d );
  const f = [ ...e ];
  const g = f[ 0 ];
  $( b, g );
}
else {
  $( 200 );
  const h = [];
  $( b, h );
}
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
- inline computed array property read
