# Preval test case

# arguments_spread_calls.md

> Arguments > Ai > Arguments spread calls
>
> Test function calls using spread with arguments

## Input

`````js filename=intro
function testSpreadCalls() {
  const args = arguments;
  const result1 = testHelper(...args);
  const result2 = testHelper(1, ...args);
  const result3 = testHelper(...args, 5);
  $(result1, result2, result3);
}

function testHelper(...params) {
  return params.length;
}

testSpreadCalls(2, 3, 4);
`````


## Settled


`````js filename=intro
const testHelper /*:(array)=>number*/ = function (...$$0 /*:array*/) {
  const params /*:array*/ /*truthy*/ = $$0;
  debugger;
  const tmpReturnArg /*:number*/ = params.length;
  return tmpReturnArg;
};
const testSpreadCalls /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const result1 /*:number*/ = testHelper(...tmpPrevalAliasArgumentsAny);
  const result2 /*:number*/ = testHelper(1, ...tmpPrevalAliasArgumentsAny);
  const result3 /*:number*/ = testHelper(...tmpPrevalAliasArgumentsAny, 5);
  $(result1, result2, result3);
  return undefined;
};
testSpreadCalls(2, 3, 4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testHelper = function (...$$0 /*:array*/) {
  const tmpReturnArg = $$0.length;
  return tmpReturnArg;
};
const testSpreadCalls = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(testHelper(...tmpPrevalAliasArgumentsAny), testHelper(1, ...tmpPrevalAliasArgumentsAny), testHelper(...tmpPrevalAliasArgumentsAny, 5));
};
testSpreadCalls(2, 3, 4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = b.length;
  return c;
};
const d = function() {
  const e = f;
  debugger;
  const g = a( ...e );
  const h = a( 1, ...e );
  const i = a( ...e, 5 );
  $( g, h, i );
  return undefined;
};
d( 2, 3, 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testHelper = function (...$$0 /*:array*/) {
  let params = $$0;
  debugger;
  const tmpReturnArg = params.length;
  return tmpReturnArg;
};
let testSpreadCalls = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = tmpPrevalAliasArgumentsAny;
  const result1 = testHelper(...args);
  const result2 = testHelper(1, ...args);
  const result3 = testHelper(...args, 5);
  $(result1, result2, result3);
  return undefined;
};
testSpreadCalls(2, 3, 4);
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
