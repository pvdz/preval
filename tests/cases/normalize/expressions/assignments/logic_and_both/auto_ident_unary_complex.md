# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) && (a = typeof $(x)));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
const tmpUnaryArg$1 /*:unknown*/ = $(1);
const tmpNestedComplexRhs /*:string*/ /*truthy*/ = typeof tmpUnaryArg$1;
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpUnaryArg$1 = $(1);
const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = typeof a;
$( b );
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpUnaryArg$1 = $(x);
  const tmpNestedComplexRhs = typeof tmpUnaryArg$1;
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
 - 1: 1
 - 2: 1
 - 3: 'number'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
