# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = --b));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  b = 0;
  a = 0;
  $(0);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
if ($(0)) {
  $($(100));
} else {
  b = 0;
  a = 0;
  $(0);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = --b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  const tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
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
const c = $( 0 );
if (c) {
  const d = $( 100 );
  $( d );
}
else {
  a = 0;
  b = 0;
  $( 0 );
}
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
