# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)?.($(1)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
  $(undefined);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  $(undefined);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, undefined, $(1));
  $(undefined);
  $(tmpChainElementCall$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( undefined );
  $( undefined );
}
else {
  const c = $( 1 );
  const d = $dotCall( a, $, undefined, c );
  $( undefined );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
