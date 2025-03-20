# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]) + (a = $(b)?.[$("x")]));
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
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
}
const tmpChainElementCall$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
  $(undefined);
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`x`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$1[tmpChainRootComputed$1];
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
  const tmpChainRootComputed = $(`x`);
  tmpBinBothLhs = tmpChainElementCall[tmpChainRootComputed];
}
const tmpChainElementCall$1 = $(b);
if (tmpChainElementCall$1 == null) {
  $(tmpBinBothLhs + undefined);
  $(undefined);
} else {
  const tmpChainRootComputed$1 = $(`x`);
  const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
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
  const e = $( "x" );
  const f = b[ e ];
  d = f;
}
const g = $( a );
const h = g == null;
if (h) {
  const i = d + undefined;
  $( i );
  $( undefined );
}
else {
  const j = $( "x" );
  const k = g[ j ];
  const l = d + k;
  $( l );
  $( k );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
