# Preval test case

# base_false.md

> Regex > Test > Base false
>
> We can resolve regex.test if we know the regex and the arg

## Input

`````js filename=intro
$(/foo/.test("brafonody"));
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = new $regex_constructor(`foo`, ``);
const tmpMCF = tmpMCOO.test;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `test`, `brafonody`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_test


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
