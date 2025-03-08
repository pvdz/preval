# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($)?.(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpThrowArg /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  tmpThrowArg = tmpChainElementCall$1;
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
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, 1);
}
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $($)?.(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, 1);
  a = tmpChainElementCall$1;
} else {
}
let tmpThrowArg = a;
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
  const d = $dotCall( a, $, undefined, 1 );
  c = d;
}
throw c;
`````

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
