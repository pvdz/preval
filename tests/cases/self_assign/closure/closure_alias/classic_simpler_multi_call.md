# Preval test case

# classic_simpler_multi_call.md

> Self assign > Closure > Closure alias > Classic simpler multi call

- [x] `let f = function(){}; const g = f; const x = $(); g(x); g(x)`
- [ ] `let f = function(){}; while() { const g = f; const x = $(); g(x); g(x)`
- [ ] `let f = function(){}; const g = f; while() { const x = $(); g(x); g(x)`

## Options

- skipEval

## Input

`````js filename=intro
// Should NOT yet inline self_closing_decoder, because closure
let self_closing_decoder /*:(unknown, unknown)=>unknown*/ = function() {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  self_closing_decoder = function($$0, $$1) {
    thisclosurebecomesargumentsobj = $('oh');
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder(thisclosurebecomesargumentsobj, $dlr_$$1);
  return tmpReturnArg;
};
const data_decoder /*:unknown*/ = self_closing_decoder;
data_decoder(1);
data_decoder(2);
`````


## Settled


`````js filename=intro
const self_closing_decoder /*:()=>unknown*/ = function () {
  debugger;
  $dlr_$$1;
  $(`oh`);
  return undefined;
};
self_closing_decoder();
self_closing_decoder();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const self_closing_decoder = function () {
  $dlr_$$1;
  $(`oh`);
};
self_closing_decoder();
self_closing_decoder();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $dlr_$$1;
  $( "oh" );
  return undefined;
};
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let self_closing_decoder = function () {
  debugger;
  let thisclosurebecomesargumentsobj = undefined;
  self_closing_decoder = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$2 = $$1;
    debugger;
    thisclosurebecomesargumentsobj = $(`oh`);
    return undefined;
  };
  const tmpReturnArg = self_closing_decoder(thisclosurebecomesargumentsobj, $dlr_$$1);
  return tmpReturnArg;
};
const data_decoder = self_closing_decoder;
self_closing_decoder(1);
data_decoder(2);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

$dlr_$$1


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
