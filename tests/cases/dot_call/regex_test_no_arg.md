# Preval test case

# regex_test_no_arg.md

> Dot call > Regex test no arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'test');
$(x);
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
const rex = new $regex_constructor(`foo`, ``);
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, `test`);
$(x);
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
