# Preval test case

# call.md

> Expandos > Functions > Call
>
> Basic expando stuff

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = function(){ $('pass'); };
$(f.foo());
`````

## Settled


`````js filename=intro
$(`pass`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`pass`);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
f.foo = function () {
  debugger;
  $(`pass`);
};
$(f.foo());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpAssignMemLhsObj = f;
const tmpAssignMemRhs = function () {
  debugger;
  $(`pass`);
  return undefined;
};
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
const tmpCalleeParam = f.foo();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "pass" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'pass'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
