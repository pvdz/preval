# Preval test case

# base.md

> Normalize > Arguments > Len > Base
>
> Base case for the special `arguments.length` case

## Input

`````js filename=intro
function f() {
  $(arguments.length);
}
f(1, 2, 3);
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
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
f(1, 2, 3);
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
