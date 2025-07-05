# Preval test case

# arguments_nested_function.md

> Arguments > Ai > Arguments nested function
>
> Test arguments access in nested function declaration

## Input

`````js filename=intro
function testArgsNested() {
  function inner() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  }
  inner('inner_arg');
}
testArgsNested('outer_arg');
`````


## Settled


`````js filename=intro
const inner /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  $(1, first);
  return undefined;
};
inner(`inner_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const inner = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(1, tmpPrevalAliasArgumentsAny[0]);
};
inner(`inner_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  $( 1, d );
  return undefined;
};
a( "inner_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsNested = function () {
  debugger;
  let inner = function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  };
  inner(`inner_arg`);
  return undefined;
};
testArgsNested(`outer_arg`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'inner_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
