# Preval test case

# stmt_tdz.md

> Normalize > Identifier > Stmt tdz
>
> Known ident that will trigger tdz will still be eliminated, for now. Impossible to safely detect but we can improve some cases later.

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
x;
let x = 10;
$('fail');
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: x;`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: x;`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: x;";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
