# Preval test case

# default_yes__0.md

> Normalize > Pattern > Param > Ident > Default yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(0, 200));
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let x = tmpParamBare === undefined ? `fail` : tmpParamBare;
  return x;
};
$(f(0, 200));
`````

## Normalized


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
const tmpCalleeParam = f(0, 200);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
