# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($)?.($(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpThrowArg /*:unknown*/ /*ternaryConst*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpThrowArg = undefined;
if (!tmpIfTest) {
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
let c = undefined;
if (b) {

}
else {
  const d = $( 1 );
  c = $dotCall( a, $, undefined, d );
}
throw c;
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
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
