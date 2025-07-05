# Preval test case

# arguments_nested_calls.md

> Arguments > Ai > Arguments nested calls
>
> Test nested function calls with arguments

## Input

`````js filename=intro
function testNestedCalls() {
  const result1 = innerCall1(arguments);
  const result2 = innerCall2(arguments);
  $(result1, result2);
}

function innerCall1(args) {
  return args.length;
}

function innerCall2(args) {
  const result = innerCall3(args);
  return result;
}

function innerCall3(args) {
  return args[0] + args[1];
}

testNestedCalls(10, 20);
`````


## Settled


`````js filename=intro
const testNestedCalls /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpClusterSSA_result1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  const tmpBinBothLhs /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpBinBothRhs /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpClusterSSA_result /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
  $(tmpClusterSSA_result1, tmpClusterSSA_result);
  return undefined;
};
testNestedCalls(10, 20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testNestedCalls = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpClusterSSA_result1 = tmpPrevalAliasArgumentsAny.length;
  const tmpBinBothLhs = tmpPrevalAliasArgumentsAny[0];
  $(tmpClusterSSA_result1, tmpBinBothLhs + tmpPrevalAliasArgumentsAny[1]);
};
testNestedCalls(10, 20);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.length;
  const e = b[ 0 ];
  const f = b[ 1 ];
  const g = e + f;
  $( d, g );
  return undefined;
};
a( 10, 20 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let innerCall1 = function ($$0) {
  let args = $$0;
  debugger;
  const tmpReturnArg = args.length;
  return tmpReturnArg;
};
let innerCall2 = function ($$0) {
  let args$1 = $$0;
  debugger;
  const result = innerCall3(args$1);
  return result;
};
let innerCall3 = function ($$0) {
  let args$3 = $$0;
  debugger;
  const tmpBinBothLhs = args$3[0];
  const tmpBinBothRhs = args$3[1];
  const tmpReturnArg$1 = tmpBinBothLhs + tmpBinBothRhs;
  return tmpReturnArg$1;
};
let testNestedCalls = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const result1 = innerCall1(tmpPrevalAliasArgumentsAny);
  const result2 = innerCall2(tmpPrevalAliasArgumentsAny);
  $(result1, result2);
  return undefined;
};
testNestedCalls(10, 20);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2, 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
