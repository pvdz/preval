# Preval test case

# arguments_nested_scope_args.md

> Arguments > Ai > Arguments nested scope args
>
> Test nested scope arguments behavior

## Input

`````js filename=intro
function testNestedScopeArgs() {
  const outerArgs = arguments;
  
  function inner1() {
    const innerArgs = arguments;
    return innerArgs.length;
  }
  
  function inner2() {
    return outerArgs.length;
  }
  
  const result1 = inner1(1, 2, 3);
  const result2 = inner2(1, 2, 3);
  $(result1, result2);
}

testNestedScopeArgs('x', 'y', 'z');
`````


## Settled


`````js filename=intro
const inner1 /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpReturnArg /*:unknown*/ = tmpPrevalAliasArgumentsAny$1.length;
  return tmpReturnArg;
};
const testNestedScopeArgs /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const result1 /*:unknown*/ = inner1(1, 2, 3);
  const tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  $(result1, tmpReturnArg$1);
  return undefined;
};
testNestedScopeArgs(`x`, `y`, `z`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const inner1 = function () {
  const tmpReturnArg = arguments.length;
  return tmpReturnArg;
};
const testNestedScopeArgs = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(inner1(1, 2, 3), tmpPrevalAliasArgumentsAny.length);
};
testNestedScopeArgs(`x`, `y`, `z`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.length;
  return d;
};
const e = function() {
  const f = c;
  debugger;
  const g = a( 1, 2, 3 );
  const h = f.length;
  $( g, h );
  return undefined;
};
e( "x", "y", "z" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testNestedScopeArgs = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  let inner1 = function () {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    debugger;
    const innerArgs = tmpPrevalAliasArgumentsAny$1;
    const tmpReturnArg = innerArgs.length;
    return tmpReturnArg;
  };
  let inner2 = function () {
    debugger;
    const tmpReturnArg$1 = outerArgs.length;
    return tmpReturnArg$1;
  };
  const outerArgs = tmpPrevalAliasArgumentsAny;
  const result1 = inner1(1, 2, 3);
  const result2 = inner2(1, 2, 3);
  $(result1, result2);
  return undefined;
};
testNestedScopeArgs(`x`, `y`, `z`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


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
