# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($)?.(1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  $dotCall(tmpChainElementCall, $, undefined, 1);
  $(a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  $dotCall(tmpChainElementCall, $, undefined, 1);
  $(a);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
  $( undefined );
}
else {
  $dotCall( a, $, undefined, 1 );
  $( c );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
