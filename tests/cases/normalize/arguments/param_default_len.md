# Preval test case

# param_default_len.md

> Normalize > Arguments > Param default len
>
> The `arguments` object is a valid default expression

## Input

`````js filename=intro
function f(a = arguments.length) {
  return a;
}
$(f());
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
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? tmpPrevalAliasArgumentsLen : tmpParamBare;
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsLen;
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
