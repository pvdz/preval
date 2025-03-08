# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($)?.($(1))));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(...undefined);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  a = tmpChainElementCall$1;
  $(...tmpChainElementCall$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(...undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, $(1));
  a = tmpChainElementCall$1;
  $(...tmpChainElementCall$1);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($)?.($(1))));
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
  const tmpCalleeParam = tmpChainElementCall;
  const tmpCalleeParam$1 = tmpChainRootCall;
  const tmpCalleeParam$3 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
  a = tmpChainElementCall$1;
} else {
}
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( $ );
const c = b == null;
if (c) {
  $( ...undefined );
}
else {
  const d = $( 1 );
  const e = $dotCall( b, $, undefined, d );
  a = e;
  $( ...e );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
