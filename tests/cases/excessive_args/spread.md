# Preval test case

# spread.md

> Excessive args > Spread
>
> A spread can be eliminated if there is no param to receive it

## Input

`````js filename=intro
const f = function () {
  $('a')
  $('a')
  $('a')
  $('a')
};
f(...xyz);
`````

## Settled


`````js filename=intro
[...xyz];
$(`a`);
$(`a`);
$(`a`);
$(`a`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...xyz];
$(`a`);
$(`a`);
$(`a`);
$(`a`);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`a`);
  $(`a`);
  $(`a`);
};
f(...xyz);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`a`);
  $(`a`);
  $(`a`);
  return undefined;
};
f(...xyz);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...xyz ];
$( "a" );
$( "a" );
$( "a" );
$( "a" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

xyz

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
