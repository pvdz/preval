# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) + $(2)) || (a = $(1) + $(2)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
if (a) {
  $(a);
  $(a);
} else {
  const tmpBinBothLhs$1 /*:unknown*/ = $(1);
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:primitive*/ = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1) + $(2);
if (a) {
  $(a);
  $(a);
} else {
  const tmpNestedComplexRhs = $(1) + $(2);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
if (c) {
  $( c );
  $( c );
}
else {
  const d = $( 1 );
  const e = $( 2 );
  const f = d + e;
  $( f );
  $( f );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
