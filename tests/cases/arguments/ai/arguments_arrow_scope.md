# Preval test case

# arguments_arrow_scope.md

> Arguments > Ai > Arguments arrow scope
>
> Test arguments in arrow function scope behavior

## Input

`````js filename=intro
function testArrowScope() {
  const outerArgs = arguments;
  const arrow1 = () => {
    const innerArgs = arguments;
    return innerArgs.length;
  };
  const arrow2 = () => {
    return outerArgs.length;
  };
  const result1 = arrow1(1, 2, 3);
  const result2 = arrow2(1, 2, 3);
  $(result1, result2);
}

testArrowScope('a', 'b', 'c');
`````


## Settled


`````js filename=intro
const testArrowScope /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpClusterSSA_result1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  const tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  $(tmpClusterSSA_result1, tmpReturnArg$1);
  return undefined;
};
testArrowScope(`a`, `b`, `c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArrowScope = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(tmpPrevalAliasArgumentsAny.length, tmpPrevalAliasArgumentsAny.length);
};
testArrowScope(`a`, `b`, `c`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.length;
  const e = b.length;
  $( d, e );
  return undefined;
};
a( "a", "b", "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArrowScope = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const outerArgs = tmpPrevalAliasArgumentsAny;
  const arrow1 = function () {
    debugger;
    const innerArgs = tmpPrevalAliasArgumentsAny;
    const tmpReturnArg = innerArgs.length;
    return tmpReturnArg;
  };
  const arrow2 = function () {
    debugger;
    const tmpReturnArg$1 = outerArgs.length;
    return tmpReturnArg$1;
  };
  const result1 = arrow1(1, 2, 3);
  const result2 = arrow2(1, 2, 3);
  $(result1, result2);
  return undefined;
};
testArrowScope(`a`, `b`, `c`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
