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


## Todos triggered


None


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
