# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) || (a = [$(1), 2, $(3)]));
$(a);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
let a /*:unknown*/ = [tmpArrElement, 2, tmpArrElement$3];
if (a) {
  $(a);
} else {
  const tmpArrElement$5 /*:unknown*/ = $(1);
  const tmpArrElement$9 /*:unknown*/ = $(3);
  const tmpNestedComplexRhs /*:array*/ = [tmpArrElement$5, 2, tmpArrElement$9];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
let a = [tmpArrElement, 2, tmpArrElement$3];
if (a) {
  $(a);
} else {
  const tmpArrElement$5 = $(1);
  const tmpArrElement$9 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$5, 2, tmpArrElement$9];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) || (a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpArrElement$5 = $(1);
  const tmpArrElement$7 = 2;
  const tmpArrElement$9 = $(3);
  const tmpNestedComplexRhs = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
let c = [ a, 2, b ];
if (c) {
  $( c );
}
else {
  const d = $( 1 );
  const e = $( 3 );
  const f = [ d, 2, e ];
  c = f;
  $( f );
}
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
