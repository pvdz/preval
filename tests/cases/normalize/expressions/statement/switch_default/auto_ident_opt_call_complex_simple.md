# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    $($)?.(1);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $dotCall(tmpChainElementCall, $, undefined, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $dotCall(tmpChainElementCall, $, undefined, 1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( $ );
const b = a == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  $dotCall( a, $, undefined, 1 );
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
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
