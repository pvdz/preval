# Preval test case

# regex_test_multi_arg.md

> Dot call > Regex test multi arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'test', 'why is foo always used', $, unknown);
$(x);
`````


## Settled


`````js filename=intro
unknown;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const rex = new $regex_constructor(`foo`, ``);
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, `test`, `why is foo always used`, $, unknown);
$(x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_test


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
