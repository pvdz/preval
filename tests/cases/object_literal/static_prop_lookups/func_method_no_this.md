# Preval test case

# func_method_no_this.md

> Object literal > Static prop lookups > Func method no this
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const f = function(){ $('piss'); $('pass'); $('poss'); };
const o = {f};
$(o.f());
`````

## Settled


`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`piss`);
$(`pass`);
$(`poss`);
$(undefined);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
};
const o = { f: f };
$(o.f());
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(`piss`);
  $(`pass`);
  $(`poss`);
  return undefined;
};
const o = { f: f };
const tmpCalleeParam = o.f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "piss" );
$( "pass" );
$( "poss" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'piss'
 - 2: 'pass'
 - 3: 'poss'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
