# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $($)?.($(1)))) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(100);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
  $(100);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(100);
  $(undefined);
} else {
  const tmpClusterSSA_a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  $(100);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( 100 );
  $( undefined );
}
else {
  const c = $( 1 );
  const d = $dotCall( a, $, undefined, c );
  $( 100 );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  let tmpCalleeParam = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, tmpCalleeParam);
  a = tmpChainElementCall$1;
} else {
}
const tmpSwitchDisc = a;
$(100);
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
 - 3: 1
 - 4: 100
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
