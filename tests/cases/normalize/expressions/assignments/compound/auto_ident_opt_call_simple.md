# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $?.(1)));
$(a);
`````

## Settled


`````js filename=intro
let tmpClusterSSA_a /*:number*/ = NaN;
const tmpIfTest /*:boolean*/ = $ == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  tmpClusterSSA_a = a * tmpChainElementCall;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_a = NaN;
const tmpIfTest = $ == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  tmpClusterSSA_a = a * $(1);
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpBinBothRhs = tmpChainElementCall;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = NaN;
const b = $ == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  c ** 0;
  $( NaN );
}
else {
  const d = $( 1 );
  a = c * d;
  $( a );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
