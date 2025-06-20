# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt call complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.($(1));
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
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam);
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
  $($dotCall(tmpChainElementCall, $, undefined, $(1)));
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
  const c = $( 1 );
  const d = $dotCall( a, $, undefined, c );
  $( d );
  $( "fail1" );
  $( "fail2" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $($);
  const tmpIfTest$5 = tmpChainElementCall != null;
  if (tmpIfTest$5) {
    let tmpCalleeParam = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, undefined, tmpCalleeParam);
    a = tmpChainElementCall$1;
    $(tmpChainElementCall$1);
  } else {
    $(a);
  }
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`fail1`);
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $(`fail2`);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
