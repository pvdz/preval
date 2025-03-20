# Preval test case

# regex_test.md

> Dot call > Regex test
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'test', 'why is foo always used');
$(x);
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
