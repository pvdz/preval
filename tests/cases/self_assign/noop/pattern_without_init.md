# Preval test case

# pattern_without_init.md

> Self assign > Noop > Pattern without init
>
> This has the sealer but not the expected init

## Input

`````js filename=intro
// Should inline
let a /*:()=>unknown*/ = function() {
  debugger;
  a = function() {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg /*:unknown*/ = a();
  return tmpReturnArg;
};
a();
`````


## Settled


`````js filename=intro
$(`inner`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inner`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inner" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  a = function () {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
a();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
