# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = b--));
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:number*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  b = 0;
  a = 1;
  $(1);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = 0;
  a = 1;
  $(1);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(100) && (a = b--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
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
const c = $( 100 );
if (c) {
  a = 0;
  b = 1;
  $( 1 );
}
else {
  $( c );
}
$( b, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
