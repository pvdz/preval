# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(1) ? (a = --b) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 0;
  a = 0;
  $(0);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
if ($(1)) {
  b = 0;
  a = 0;
  $(0);
} else {
  $($(200));
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(1) ? (a = --b) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  const tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  a = 0;
  b = 0;
  $( 0 );
}
else {
  const d = $( 200 );
  $( d );
}
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
