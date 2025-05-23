# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.x) + (a = $(b)?.x));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  tmpBinBothLhs = tmpChainElementCall.x;
}
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpClusterSSA_a /*:unknown*/ = tmpChainElementCall$1.x;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpClusterSSA_a;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpBinBothLhs = undefined;
if (!tmpIfTest) {
  tmpBinBothLhs = tmpChainElementCall.x;
}
const tmpChainElementCall$1 = $(b);
if (tmpChainElementCall$1 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpClusterSSA_a = tmpChainElementCall$1.x;
  $(tmpBinBothLhs + tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  d = b.x;
}
const e = $( a );
const f = e == null;
if (f) {
  const g = d + undefined;
  $( g );
  $( undefined );
}
else {
  const h = e.x;
  const i = d + h;
  $( i );
  $( h );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
