# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) || (a = ~$(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = ~tmpUnaryArg;
if (a) {
  $(a);
  $(a);
} else {
  const tmpUnaryArg$1 /*:unknown*/ = $(100);
  const tmpNestedComplexRhs /*:number*/ = ~tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
if (a) {
  $(a);
  $(a);
} else {
  const tmpUnaryArg$1 = $(100);
  const tmpNestedComplexRhs = ~tmpUnaryArg$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
if (b) {
  $( b );
  $( b );
}
else {
  const c = $( 100 );
  const d = ~c;
  $( d );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
