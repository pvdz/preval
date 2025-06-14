# Preval test case

# default_yes__str.md

> Normalize > Pattern > Param > Ident > Default yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f('xyz', 200));
`````


## Settled


`````js filename=intro
$(`xyz`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`xyz`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "xyz" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    x = `fail`;
    return x;
  } else {
    x = tmpParamBare;
    return x;
  }
};
let tmpCalleeParam = f(`xyz`, 200);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
