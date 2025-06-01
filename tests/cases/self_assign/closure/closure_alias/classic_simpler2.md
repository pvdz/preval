# Preval test case

# classic_simpler2.md

> Self assign > Closure > Closure alias > Classic simpler2

(This is what the reducer receives regardless atm)

## Input

`````js filename=intro
// Should inline, the closure is hoisted into inner func and then collapses
let self_closing_decoder /*:()=>unknown*/ = function() {
  debugger;
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  self_closing_decoder = function($$0, $$1) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
    const $dlr_$$0 /*:unknown*/ = $$0;
    const $dlr_$$1 /*:unknown*/ = $$1;
    debugger;
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    return undefined;
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder(thisclosurebecomesargumentsobj);
  return tmpReturnArg;
};
const data_decoder /*:unknown*/ = self_closing_decoder;
self_closing_decoder(123);
data_decoder(123);
data_decoder(123);
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let self_closing_decoder = function () {
  debugger;
  let thisclosurebecomesargumentsobj = undefined;
  self_closing_decoder = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpPrevalAliasArgumentsAny = tmpPrevalAliasArgumentsAny$1;
    const $dlr_$$2 = $dlr_$$0;
    const $dlr_$$4 = $dlr_$$1;
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    return undefined;
  };
  const tmpReturnArg = self_closing_decoder(thisclosurebecomesargumentsobj);
  return tmpReturnArg;
};
const data_decoder = self_closing_decoder;
self_closing_decoder(123);
data_decoder(123);
data_decoder(123);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) self-closing pattern when inner access arguments/this needs refinement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
