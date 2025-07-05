# Preval test case

# arguments_parameter_shadowing_spread.md

> Arguments > Ai > Arguments parameter shadowing spread
>
> Test parameter shadowing with spread calls

## Input

`````js filename=intro
function testArgsParameterShadowingSpread() {
  const args = arguments;
  const result1 = testHelper(...args);
  const result2 = testHelper(1, ...args);
  const result3 = testHelper(...args, 5);
  $(result1, result2, result3);
}

function testHelper(...params) {
  return params.length;
}

testArgsParameterShadowingSpread(2, 3, 4);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingSpread /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const result1 /*:number*/ = testHelper(...tmpPrevalAliasArgumentsAny);
  const result2 /*:number*/ = testHelper(1, ...tmpPrevalAliasArgumentsAny);
  const result3 /*:number*/ = testHelper(...tmpPrevalAliasArgumentsAny, 5);
  $(result1, result2, result3);
  return undefined;
};
const testHelper /*:(array)=>number*/ = function (...$$0 /*:array*/) {
  const params /*:array*/ /*truthy*/ = $$0;
  debugger;
  const tmpReturnArg /*:number*/ = params.length;
  return tmpReturnArg;
};
testArgsParameterShadowingSpread(2, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(testHelper(...tmpPrevalAliasArgumentsAny), testHelper(1, ...tmpPrevalAliasArgumentsAny), testHelper(...tmpPrevalAliasArgumentsAny, 5));
};
const testHelper = function (...$$0 /*:array*/) {
  const tmpReturnArg = $$0.length;
  return tmpReturnArg;
};
testArgsParameterShadowingSpread(2, 3, 4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = e( ...b );
  const f = e( 1, ...b );
  const g = e( ...b, 5 );
  $( d, f, g );
  return undefined;
};
const e = function($$0 ) {
  const h = $$0;
  debugger;
  const i = h.length;
  return i;
};
a( 2, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingSpread = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = tmpPrevalAliasArgumentsAny;
  const result1 = testHelper(...args);
  const result2 = testHelper(1, ...args);
  const result3 = testHelper(...args, 5);
  $(result1, result2, result3);
  return undefined;
};
let testHelper = function (...$$0 /*:array*/) {
  let params = $$0;
  debugger;
  const tmpReturnArg = params.length;
  return tmpReturnArg;
};
testArgsParameterShadowingSpread(2, 3, 4);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 4, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
