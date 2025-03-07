# Preval test case

# arglen2.md

> Normalize > Arguments > Arglen2
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
function f() {
  $(arguments.length);
}
f();
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
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  $(tmpPrevalAliasArgumentsLen);
  return undefined;
};
f();
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
