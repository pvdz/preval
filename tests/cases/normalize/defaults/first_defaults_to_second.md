# Preval test case

# first_defaults_to_second.md

> Normalize > Defaults > First defaults to second
>
> Rewrite function param defaults to equivalent body code
> In this case a=b triggers a TDZ error if the passed on value for a is `undefined`
> because in this case the params are let bindings and so TDZ triggers.

TDZ case

## Options

TDZ errors are not properly emulated so a n eval mismatch is expected

- skipEval

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    throw `Preval: TDZ triggered for this read: ((tmpParamBare === undefined)? b : tmpParamBare)`;
  } else {
    a = tmpParamBare;
    let b = undefined;
    const tmpIfTest$1 = tmpParamBare$1 === undefined;
    if (tmpIfTest$1) {
      b = `bar`;
    } else {
      b = tmpParamBare$1;
    }
    const tmpReturnArg = [a, b];
    return tmpReturnArg;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(`x`);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(undefined, `y`);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(`x`, `y`);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
