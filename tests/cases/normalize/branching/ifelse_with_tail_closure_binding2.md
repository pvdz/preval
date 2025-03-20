# Preval test case

# ifelse_with_tail_closure_binding2.md

> Normalize > Branching > Ifelse with tail closure binding2
>
> Regression found while running Preval on Tenko

Trying to make sure there's no optimization that messes up other usages of the closure.

This is essentially a TDZ problem (that's the error that should be thrown here).

## Options

TDZ errors are not properly emulated so an eval mismatch is expected

- skipEval

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz);
  };
  $(xyz);
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(xyz)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: \$(xyz)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: $(xyz)";
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
