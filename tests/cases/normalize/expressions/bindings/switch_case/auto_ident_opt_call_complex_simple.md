# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt call complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.(1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  $(tmpChainElementCall$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
