# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $($)?.(1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  $($dotCall(tmpChainElementCall, $, undefined, 1));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = $dotCall( a, $, undefined, 1 );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
