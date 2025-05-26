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
throw `Preval: TDZ triggered for this read: foo = x\$1`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: foo = x\$1`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: foo = x$1";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let foo = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    foo = x$1;
  } else {
    foo = tmpParamBare;
  }
  let tmpBindingPatternObjRoot = tmpParamBare$1;
  let x$1 = tmpBindingPatternObjRoot.x;
  return undefined;
};
x();
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
