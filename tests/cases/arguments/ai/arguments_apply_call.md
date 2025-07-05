# Preval test case

# arguments_apply_call.md

> Arguments > Ai > Arguments apply call
>
> Test using arguments with Function.apply

## Input

`````js filename=intro
function testArgsApply() {
  const testFunc = (a, b, c) => $(a, b, c);
  testFunc.apply(null, arguments);
}
testArgsApply('x', 'y', 'z');
`````


## Settled


`````js filename=intro
const testFunc /*:(unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  const c /*:unknown*/ = $$2;
  debugger;
  $(a, b, c);
  return undefined;
};
const testArgsApply /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  testFunc(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
testArgsApply(`x`, `y`, `z`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testFunc = function (a, b, c) {
  $(a, b, c);
};
const testArgsApply = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  testFunc(...tmpPrevalAliasArgumentsAny);
};
testArgsApply(`x`, `y`, `z`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  $( b, c, d );
  return undefined;
};
const e = function() {
  const f = g;
  debugger;
  a( ...f );
  return undefined;
};
e( "x", "y", "z" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsApply = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const testFunc = function ($$0, $$1, $$2) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    debugger;
    const tmpReturnArg = $(a, b, c);
    return tmpReturnArg;
  };
  const tmpMCF = testFunc.apply;
  $dotCall(tmpMCF, testFunc, `apply`, null, tmpPrevalAliasArgumentsAny);
  return undefined;
};
testArgsApply(`x`, `y`, `z`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_apply
- (todo) harden the check for being an arguments object, a prefix check seems brittle
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 'y', 'z'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
