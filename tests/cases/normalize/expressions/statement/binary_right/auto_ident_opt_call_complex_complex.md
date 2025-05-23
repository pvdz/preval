# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + $($)?.($(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
let tmpBinBothRhs /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  tmpBinBothRhs = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpBinBothRhs = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = $( $ );
const d = c == null;
if (d) {

}
else {
  const e = $( 1 );
  b = $dotCall( c, $, undefined, e );
}
a + b;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
