# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) + (a = 1 && $($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpClusterSSA_tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpClusterSSA_a$2 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2;
$(tmpCalleeParam);
$(tmpClusterSSA_a$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpBinBothLhs = $($(1));
const tmpClusterSSA_a$2 = $($(1));
$(tmpClusterSSA_tmpBinBothLhs + tmpClusterSSA_a$2);
$(tmpClusterSSA_a$2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = $( 1 );
const d = $( c );
const e = b + d;
$( e );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  let tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
const tmpBinBothLhs = a;
a = 1;
if (a) {
  let tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
