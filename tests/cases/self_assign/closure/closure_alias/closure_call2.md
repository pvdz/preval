# Preval test case

# closure_call2.md

> Self assign > Closure > Closure alias > Closure call2

## Input

`````js filename=intro
// Should NOT inline (yet) because closure is passed into recursive call
// Should move the call to the inner function
let self_closing_decoder /*:(unknown, unknown)=>unknown*/ = function() {
  $('closure call');
  self_closing_decoder = function($$0, $$1) {
    thisclosurebecomesargumentsobj = arguments;
    $(arguments); // This is hard to maintain while flattening
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder();
  return tmpReturnArg;
};
const data_decoder /*:unknown*/ = self_closing_decoder;
data_decoder(123, 1);
data_decoder(456, 4);
data_decoder(789, 7);
`````


## Settled


`````js filename=intro
let self_closing_decoder /*:()=>unknown*/ = function () {
  debugger;
  self_closing_decoder = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
    debugger;
    $(`closure call`);
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    $(tmpPrevalAliasArgumentsAny);
    return undefined;
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder();
  return tmpReturnArg;
};
const data_decoder /*:unknown*/ = self_closing_decoder;
self_closing_decoder(123, 1);
data_decoder(456, 4);
data_decoder(789, 7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let self_closing_decoder = function () {
  self_closing_decoder = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    $(`closure call`);
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    $(tmpPrevalAliasArgumentsAny);
  };
  const tmpReturnArg = self_closing_decoder();
  return tmpReturnArg;
};
const data_decoder = self_closing_decoder;
self_closing_decoder(123, 1);
data_decoder(456, 4);
data_decoder(789, 7);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  a = function($$0,$$1 ) {
    const b = c;
    debugger;
    $( "closure call" );
    thisclosurebecomesargumentsobj = b;
    $( b );
    return undefined;
  };
  const d = a();
  return d;
};
const e = a;
a( 123, 1 );
e( 456, 4 );
e( 789, 7 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let self_closing_decoder = function () {
  debugger;
  $(`closure call`);
  self_closing_decoder = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    $(tmpPrevalAliasArgumentsAny);
    return undefined;
  };
  const tmpReturnArg = self_closing_decoder();
  return tmpReturnArg;
};
const data_decoder = self_closing_decoder;
self_closing_decoder(123, 1);
data_decoder(456, 4);
data_decoder(789, 7);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) self-closing pattern when inner access arguments/this needs refinement


## Globals


BAD@! Found 1 implicit global bindings:

thisclosurebecomesargumentsobj


## Runtime Outcome


Should call `$` with:
 - 1: 'closure call'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
