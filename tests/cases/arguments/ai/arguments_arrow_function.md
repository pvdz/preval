# Preval test case

# arguments_arrow_function.md

> Arguments > Ai > Arguments arrow function
>
> Test arguments access in arrow function (should reference parent scope)

## Input

`````js filename=intro
function testArgsArrow() {
  const arrow = () => {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  };
  arrow();
}
testArgsArrow('parent_arg');
`````


## Settled


`````js filename=intro
const testArgsArrow /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  $(1, first);
  return undefined;
};
testArgsArrow(`parent_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsArrow = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(1, tmpPrevalAliasArgumentsAny[0]);
};
testArgsArrow(`parent_arg`);
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
a( "parent_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsArrow = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const arrow = function () {
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  };
  arrow();
  return undefined;
};
testArgsArrow(`parent_arg`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'parent_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
