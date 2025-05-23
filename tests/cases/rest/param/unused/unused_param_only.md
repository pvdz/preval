# Preval test case

# unused_param_only.md

> Rest > Param > Unused > Unused param only
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  return $('fwep');
}
f();
`````


## Settled


`````js filename=intro
$(`fwep`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`fwep`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "fwep" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  const tmpReturnArg = $(`fwep`);
  return tmpReturnArg;
};
f();
`````


## Todos triggered


- (todo) drop unused rest param?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
