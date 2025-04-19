# Preval test case

# array_join.md

> Type tracked > Array method > Array join
>
>

## Input

`````js filename=intro
const _0x11B59/*:array*/ = [`u`, `s`, `e`, ` `, `s`, `t`, `r`, `i`, `c`, `t`, `%`, `_`, `_`, `e`, `x`, `t`, `e`, `n`, `d`, `s`];
const tmpCallObj$11 = _0x11B59.join(``);
const tmpCallObj$9 = tmpCallObj$11.split(`%`);
const tmpCallObj$7 = tmpCallObj$9.join(`^`);
const tmpCallObj$5 = tmpCallObj$7.split(`#1`);
const tmpCallObj$3 = tmpCallObj$5.join(`%`);
const tmpCallObj$1 = tmpCallObj$3.split(`#0`);
const tmpCallObj = tmpCallObj$1.join(`#`);
const tmpReturnArg = tmpCallObj.split(`^`);
$(tmpReturnArg);
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:array*/ = [`use strict`, `__extends`];
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`use strict`, `__extends`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "use strict", "__extends" ];
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) access object property that also exists on prototype? $array_join
- (todo) arr mutation may be able to inline this method: tmpMCF$3
- (todo) arr mutation may be able to inline this method: tmpMCF$7
- (todo) arr mutation may be able to inline this method: tmpMCF$11


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['use strict', '__extends']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
