# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $($)?.(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_tmpBinBothRhs /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  const tmpClusterSSA_a$3 /*:number*/ = a * tmpClusterSSA_tmpBinBothRhs;
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $($Number_NaN);
  $($Number_NaN);
} else {
  const tmpClusterSSA_a$3 = a * $dotCall(tmpChainElementCall, $, undefined, 1);
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  c ** 0;
  $( $Number_NaN );
  $( $Number_NaN );
}
else {
  const d = $dotCall( a, $, undefined, 1 );
  const e = c * d;
  $( e );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
