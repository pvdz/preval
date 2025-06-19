# Preval test case

# arglen3.md

> Normalize > Arguments > Arglen3
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
const f = function() {
  $(arguments.length);
}
f();
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
