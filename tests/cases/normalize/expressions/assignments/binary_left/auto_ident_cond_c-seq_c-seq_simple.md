# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) + $(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
}
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(30)) {
  a = $(60);
} else {
  a = $($(100));
}
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
const d = $( 100 );
const e = a + d;
$( e );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 100
 - 4: 160
 - 5: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
