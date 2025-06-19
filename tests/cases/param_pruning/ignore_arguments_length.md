# Preval test case

# ignore_arguments_length.md

> Param pruning > Ignore arguments length
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(arguments.length, x, z);
}
f();
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
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpReturnArg = $(tmpPrevalAliasArgumentsLen, x, z);
  return tmpReturnArg;
};
f();
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
