# Preval test case

# tdz_loop.md

> Const aliasing > Tdz loop
> 
> This example was looping because the code wasn't checking whether lhsName === rhsName
> and so it was infinitely transforming `const y = y` (:

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(y, 'number');
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````


## Settled


`````js filename=intro
$(`50`);
throw `Preval: TDZ triggered for this read: y;`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50`);
throw `Preval: TDZ triggered for this read: y;`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "50" );
throw "Preval: TDZ triggered for this read: y;";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50'
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
