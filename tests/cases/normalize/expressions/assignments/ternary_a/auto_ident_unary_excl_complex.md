# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) ? $(100) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
if (tmpUnaryArg) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
if (tmpUnaryArg) {
  $($(200));
  $(a);
} else {
  $($(100));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
if (a) {
  const c = $( 200 );
  $( c );
  $( b );
}
else {
  const d = $( 100 );
  $( d );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 200
 - 3: 200
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
