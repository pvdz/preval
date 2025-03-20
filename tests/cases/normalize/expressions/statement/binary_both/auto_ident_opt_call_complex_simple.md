# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($)?.(1) + $($)?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpBinBothLhs = tmpChainElementCall$1;
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainElementCall$3 /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementCall$3, $, undefined, 1);
  tmpBinBothRhs = tmpChainElementCall$5;
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpBinBothLhs = $dotCall(tmpChainElementCall, $, undefined, 1);
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $($);
if (!(tmpChainElementCall$3 == null)) {
  tmpBinBothRhs = $dotCall(tmpChainElementCall$3, $, undefined, 1);
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {

}
else {
  const d = $dotCall( b, $, undefined, 1 );
  a = d;
}
let e = undefined;
const f = $( $ );
const g = f == null;
if (g) {

}
else {
  const h = $dotCall( f, $, undefined, 1 );
  e = h;
}
a + e;
const i = {
  a: 999,
  b: 1000,
};
$( i );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
