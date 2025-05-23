# Preval test case

# base.md

> Type tracked > Regex method > Base
>
> Regex method call inlining

## Input

`````js filename=intro
$(/foo/.test('hello foo world'));
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = new $regex_constructor(`foo`, ``);
const tmpMCF = tmpMCOO.test;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `test`, `hello foo world`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_test


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
