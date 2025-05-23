# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = $($)?.($(1)))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpObjLitPropKey /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$1);
  tmpObjLitPropKey = a;
}
const tmpCalleeParam /*:object*/ = { [tmpObjLitPropKey]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpObjLitPropKey = undefined;
if (!tmpIfTest) {
  a = $dotCall(tmpChainElementCall, $, undefined, $(1));
  tmpObjLitPropKey = a;
}
$({ [tmpObjLitPropKey]: 10 });
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
const f = { [ d ]: 10 };
$( f );
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
 - 3: 1
 - 4: { 1: '10' }
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
