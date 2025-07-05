# Preval test case

# regression.md

> Normalize > Arguments > Regression
>
> Regression that was leading to a crash due to arguments.length. The outer func was mandatory, as was the param default

## Input

`````js filename=intro
const f = function(x1) {
  let x = undefined;
  if ($) {
    x = {};
  } 
  const g = function() {
    $(arguments.length)
  }
  return g();
}
$(f());
`````


## Settled


`````js filename=intro
$(0);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let x1 = $$0;
  debugger;
  let x = undefined;
  if ($) {
    x = {};
  } else {
  }
  const g = function () {
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    $(tmpPrevalAliasArgumentsLen);
    return undefined;
  };
  const tmpReturnArg = g();
  return tmpReturnArg;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
