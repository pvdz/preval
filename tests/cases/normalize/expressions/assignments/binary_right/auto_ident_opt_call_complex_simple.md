# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($)?.(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementCall$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let a = undefined;
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(tmpBinBothLhs + undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, 1);
  a = tmpChainElementCall$1;
  $(tmpBinBothLhs + tmpChainElementCall$1);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $($)?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = $( $ );
const d = c == null;
if (d) {
  const e = a + undefined;
  $( e );
}
else {
  const f = $dotCall( c, $, undefined, 1 );
  b = f;
  const g = a + f;
  $( g );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 101
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
