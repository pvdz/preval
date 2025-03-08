# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($)?.($(1)))["a"];
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpCompObj /*:unknown*/ = undefined;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  a = tmpChainElementCall$1;
  tmpCompObj = tmpChainElementCall$1;
}
tmpCompObj.a;
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
let tmpCompObj = undefined;
if (!tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, $(1));
  a = tmpChainElementCall$1;
  tmpCompObj = tmpChainElementCall$1;
}
tmpCompObj.a;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($)?.($(1)))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
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
let tmpCompObj = a;
tmpCompObj.a;
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
  const f = $dotCall( b, $, undefined, e );
  a = f;
  d = f;
}
d.a;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
