# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($(1)) && $($(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpThrowArg = $(tmpCalleeParam$1);
} else {
  tmpThrowArg = a;
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
let tmpThrowArg = undefined;
if (a) {
  tmpThrowArg = $($(2));
} else {
  tmpThrowArg = a;
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  c = $( d );
}
else {
  c = b;
}
throw c;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
