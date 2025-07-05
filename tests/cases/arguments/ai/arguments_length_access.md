# Preval test case

# arguments_length_access.md

> Arguments > Ai > Arguments length access
>
> Test arguments.length access in strict mode

## Input

`````js filename=intro
function testArgsLength() {
  const len = arguments.length;
  $(len);
}
testArgsLength(1, 2, 3);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsLength = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const len = tmpPrevalAliasArgumentsLen;
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
testArgsLength(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
