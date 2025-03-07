# Preval test case

# base.md

> Function > Apply > Base
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.apply({}, ['x']));
`````

## Settled


`````js filename=intro
const tmpCallObj /*:()=>unknown*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
tmpCallObj(`x`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(...tmpPrevalAliasArgumentsAny);
};
tmpCallObj(`x`);
$(undefined);
`````

## Pre Normal


`````js filename=intro
$(
  function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    $(...tmpPrevalAliasArgumentsAny);
  }.apply({}, [`x`]),
);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = [`x`];
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpCalleeParam = tmpCallObj.apply(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  $( ...b );
  return undefined;
};
a( "x" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'x'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
