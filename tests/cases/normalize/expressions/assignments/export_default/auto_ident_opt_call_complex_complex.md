# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $($)?.($(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpAnonDefaultExport /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
  tmpAnonDefaultExport = a;
}
export { tmpAnonDefaultExport as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpAnonDefaultExport = undefined;
if (!tmpIfTest) {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  tmpAnonDefaultExport = a;
}
export { tmpAnonDefaultExport as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = $( 1 );
  a = $dotCall( b, $, undefined, e );
  d = a;
}
export { d as default };
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
