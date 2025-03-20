# Preval test case

# unused_param_last.md

> Rest > Param > Unused > Unused param last
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(a, b, ...rest) {
  return $(a, b, 'fwep');
}
f($spy(), $spy());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy();
const tmpCalleeParam$1 /*:unknown*/ = $spy();
$(tmpCalleeParam, tmpCalleeParam$1, `fwep`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($spy(), $spy(), `fwep`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $spy();
$( a, b, "fwep" );
`````


## Todos triggered


- drop unused rest param?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: 'Creating spy', 2, 0, ['spy', 12345]
 - 3: '<spy[1]>', '<spy[2]>', 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
