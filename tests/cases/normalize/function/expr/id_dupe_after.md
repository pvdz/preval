# Preval test case

# id_dupe_after.md

> Normalize > Function > Expr > Id dupe after
>
> Function expression ids should be eliminated

## Input

`````js filename=intro
const f = function g() {
  $(typeof g);
};
const g = 10;
$(g, f());
`````


## Settled


`````js filename=intro
$(`function`);
$(10, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function`);
$(10, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function" );
$( 10, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g$1 = function () {
  debugger;
  let tmpCalleeParam = typeof g$1;
  $(tmpCalleeParam);
  return undefined;
};
const f = g$1;
const g = 10;
let tmpCalleeParam$1 = g;
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$1, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
