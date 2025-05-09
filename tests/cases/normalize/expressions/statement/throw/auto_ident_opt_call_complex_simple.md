# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($)?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, 1);
}
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, 1);
}
throw tmpThrowArg;
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
  a = $dotCall( b, $, undefined, 1 );
}
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
