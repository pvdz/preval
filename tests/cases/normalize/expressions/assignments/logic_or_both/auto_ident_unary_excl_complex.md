# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) || (a = !$(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
if (tmpUnaryArg) {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  const tmpNestedComplexRhs /*:boolean*/ /*banged*/ = !tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(true);
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(100)) {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(true);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 100 );
  const c = !b;
  $( c );
  $( c );
}
else {
  $( true );
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = !tmpUnaryArg$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
