# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpBinBothLhs = a;
}
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
let tmpBinBothLhs = undefined;
if (a) {
  tmpBinBothLhs = a;
} else {
  a = $($(2));
  tmpBinBothLhs = a;
}
$(tmpBinBothLhs + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
const e = $( 100 );
const f = c + e;
$( f );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 100
 - 6: 102
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
