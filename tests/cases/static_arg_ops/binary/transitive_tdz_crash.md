# Preval test case

# transitive_tdz_crash.md

> Static arg ops > Binary > Transitive tdz crash
>
> This case was bugged and lead to a TDZ error being compiled in, incorrectly, due to static arg outlining

## Input

`````js filename=intro
const f = function(arg) {
  const tmp = arg - 1902;
  g(tmp);
};
const g = function(a2) {
  const x = a2 - (-990);
  $(x);
};
f(1495);
f(1800);
g(272);
`````


## Settled


`````js filename=intro
$(583);
$(888);
$(1262);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(583);
$(888);
$(1262);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 583 );
$( 888 );
$( 1262 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 583
 - 2: 888
 - 3: 1262
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
