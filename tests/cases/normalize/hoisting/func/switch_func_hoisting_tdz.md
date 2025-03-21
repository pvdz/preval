# Preval test case

# switch_func_hoisting_tdz.md

> Normalize > Hoisting > Func > Switch func hoisting tdz
>
> Func decl inside a switch block

## Input

`````js filename=intro
f(); // This should fail
switch ($(1)) {
  case $(1):
    f();
    break;
  case $(2):
    function f() { $('pass'); }
}
`````


## Settled


`````js filename=intro
f();
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
f();
if ($(1) === $(1)) {
  $(`pass`);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
f();
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( "pass" );
}
else {
  $( 2 );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

f


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
