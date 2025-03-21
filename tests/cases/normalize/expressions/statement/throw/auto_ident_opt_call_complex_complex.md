# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($)?.($(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpThrowArg /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  tmpThrowArg = tmpChainElementCall$1;
}
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpThrowArg = undefined;
const tmpChainElementCall = $($);
if (!(tmpChainElementCall == null)) {
  tmpThrowArg = $dotCall(tmpChainElementCall, $, undefined, $(1));
}
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($)?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  tmpThrowArg = tmpChainElementCall$1;
} else {
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
  const d = $( 1 );
  const e = $dotCall( b, $, undefined, d );
  a = e;
}
throw a;
`````

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
