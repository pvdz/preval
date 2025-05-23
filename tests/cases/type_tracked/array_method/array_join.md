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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const _0x11B59 = [`u`, `s`, `e`, ` `, `s`, `t`, `r`, `i`, `c`, `t`, `%`, `_`, `_`, `e`, `x`, `t`, `e`, `n`, `d`, `s`];
const tmpMCF = _0x11B59.join;
const tmpCallObj$11 = $dotCall(tmpMCF, _0x11B59, `join`, ``);
const tmpMCF$1 = tmpCallObj$11.split;
const tmpCallObj$9 = $dotCall(tmpMCF$1, tmpCallObj$11, `split`, `%`);
const tmpMCF$3 = tmpCallObj$9.join;
const tmpCallObj$7 = $dotCall(tmpMCF$3, tmpCallObj$9, `join`, `^`);
const tmpMCF$5 = tmpCallObj$7.split;
const tmpCallObj$5 = $dotCall(tmpMCF$5, tmpCallObj$7, `split`, `#1`);
const tmpMCF$7 = tmpCallObj$5.join;
const tmpCallObj$3 = $dotCall(tmpMCF$7, tmpCallObj$5, `join`, `%`);
const tmpMCF$9 = tmpCallObj$3.split;
const tmpCallObj$1 = $dotCall(tmpMCF$9, tmpCallObj$3, `split`, `#0`);
const tmpMCF$11 = tmpCallObj$1.join;
const tmpCallObj = $dotCall(tmpMCF$11, tmpCallObj$1, `join`, `#`);
const tmpMCF$13 = tmpCallObj.split;
const tmpReturnArg = $dotCall(tmpMCF$13, tmpCallObj, `split`, `^`);
$(tmpReturnArg);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) arr mutation may be able to inline this method: tmpMCF$11
- (todo) arr mutation may be able to inline this method: tmpMCF$3
- (todo) arr mutation may be able to inline this method: tmpMCF$7
- (todo) support array reads statement type ExpressionStatement


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
