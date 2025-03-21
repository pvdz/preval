# Preval test case

# flash2.md

> Normalize > Pattern > Binding > Flash2
>
> Regression hunting

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

Note that the implicit global is caused by TDZ access of x. The pattern `{x}` is cleaned up because it's otherwise unused. But the TDZ access for `foo=x` is left behind.

- skipEval

## Input

`````js filename=intro
function x(foo = x, {x}) { 
  //return [foo, x]; 
}
x();
`````


## Settled


`````js filename=intro
throw `Preval: This statement contained a read that reached no writes: x\$1;`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: This statement contained a read that reached no writes: x\$1;`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: This statement contained a read that reached no writes: x$1;";
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
