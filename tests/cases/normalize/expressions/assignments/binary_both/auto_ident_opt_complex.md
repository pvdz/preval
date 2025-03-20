# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt complex
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
let tmpBinBothLhs /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  tmpBinBothLhs = tmpChainElementObject;
}
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1.x;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementObject$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpChainElementObject$1);
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
  const tmpChainElementObject$1 = tmpChainElementCall$1.x;
  $(tmpBinBothLhs + tmpChainElementObject$1);
  $(tmpChainElementObject$1);
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
  const e = b.x;
  d = e;
}
const f = $( a );
const g = f == null;
if (g) {
  const h = d + undefined;
  $( h );
  $( undefined );
}
else {
  const i = f.x;
  const j = d + i;
  $( j );
  $( i );
}
`````


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
