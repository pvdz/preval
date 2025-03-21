# Preval test case

# pattern_sequence_complex_tdz_crash2.md

> Normalize > Binding > Case-block > Pattern sequence complex tdz crash2
>
> Assignments of all kinds should be normalized in all circumstances

For now I guess we can't really support this TDZ case. We have to outline the binding.

Maybe in the future we can come up with a solution where with more analysis we can do better. Not sure how important that is. But it's not a priority.

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro

switch (1) { default: let x = x; $('fail'); }
`````


## Settled


`````js filename=intro
$(`fail`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`fail`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "fail" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
