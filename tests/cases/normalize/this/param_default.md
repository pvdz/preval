# Preval test case

# param_default.md

> Normalize > This > Param default
>
> The `this` object is a valid default expression

## Input

`````js filename=intro
function f(a = this) {
  return a;
}
$(f());
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasThis : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasThis = this;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasThis;
    return a;
  } else {
    a = tmpParamBare;
    return a;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
