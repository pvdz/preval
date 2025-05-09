# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = $($)?.(1)) });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpObjSpread /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpObjSpread = a;
}
const tmpCalleeParam /*:object*/ = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpObjSpread = undefined;
if (!tmpIfTest) {
  a = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpObjSpread = a;
}
$({ ...tmpObjSpread });
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
  a = $dotCall( b, $, undefined, 1 );
  d = a;
}
const e = { ... d };
$( e );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
