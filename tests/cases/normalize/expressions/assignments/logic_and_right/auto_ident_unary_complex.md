# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = typeof $(x)));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpUnaryArg /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpUnaryArg = $(1);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, 1);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 1 );
  const c = typeof b;
  $( c );
  $( c, 1 );
}
else {
  $( a );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpUnaryArg = $(x);
  const tmpNestedComplexRhs = typeof tmpUnaryArg;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, x);
} else {
  $(tmpCalleeParam);
  $(a, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 'number'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
