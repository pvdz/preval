# Preval test case

# classic_simpler_len.md

> Self assign > Closure > Closure alias > Classic simpler len

## Input

`````js filename=intro
// Should NOT inline (yet) because closure is passed into recursive call
let self_closing_decoder = function(a, b, c) {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  self_closing_decoder = function(a, b, c) {
    thisclosurebecomesargumentsobj = arguments;
    $(arguments.length); // This is trivial for the alias calling case. Less so for the sealer call case.
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder(thisclosurebecomesargumentsobj, b, c);
  return tmpReturnArg;
};
const data_decoder /*:unknown*/ = self_closing_decoder;
data_decoder(1, 2, 3);
data_decoder(4, 5);
data_decoder(6);
`````


## Settled


`````js filename=intro
$(3);
$(3);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(3);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 3 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let self_closing_decoder = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  let thisclosurebecomesargumentsobj = undefined;
  self_closing_decoder = function ($$0, $$1, $$2) {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    let a$1 = $$0;
    let b$1 = $$1;
    let c$1 = $$2;
    debugger;
    thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
    $(tmpPrevalAliasArgumentsLen);
    return undefined;
  };
  const tmpReturnArg = self_closing_decoder(thisclosurebecomesargumentsobj, b, c);
  return tmpReturnArg;
};
const data_decoder = self_closing_decoder;
self_closing_decoder(1, 2, 3);
data_decoder(4, 5);
data_decoder(6);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) self assign simple case but with tmp call has param parity mismatch
- (todo) self-closing pattern when inner access arguments/this needs refinement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
