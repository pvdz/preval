# Preval test case

# arguments_empty_function.md

> Arguments > Ai > Arguments empty function
>
> Test arguments access in function with no parameters

## Input

`````js filename=intro
function testArgsEmpty() {
  const len = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  $(len, first, second);
}
testArgsEmpty();
`````


## Settled


`````js filename=intro
$(0, undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0, undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0, undefined, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsEmpty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  $(len, first, second);
  return undefined;
};
testArgsEmpty();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
