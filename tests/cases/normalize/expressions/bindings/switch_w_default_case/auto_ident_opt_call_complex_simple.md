# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt call complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.(1);
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$5) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, 1);
  $(tmpChainElementCall$1);
  $(`fail1`);
  $(`fail2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
if (tmpChainElementCall == null) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  $($dotCall(tmpChainElementCall, $, undefined, 1));
  $(`fail1`);
  $(`fail2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
if (b) {
  $( undefined );
  $( "fail1" );
  $( "fail2" );
}
else {
  const c = $dotCall( a, $, undefined, 1 );
  $( c );
  $( "fail1" );
  $( "fail2" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
