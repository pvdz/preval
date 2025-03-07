# Preval test case

# arguments.md

> Static arg ops > Coerce > Const > Arguments

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(arguments, 'number');
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````

## Settled


`````js filename=intro
$(`50`);
const f /*:()=>unknown*/ = function () {
  debugger;
  $(1);
  $(2);
  $(NaN);
  return undefined;
};
f();
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50`);
const f = function () {
  $(1);
  $(2);
  $(NaN);
};
f();
f();
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  const y = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  debugger;
  const y = $coerce(tmpPrevalAliasArgumentsAny, `number`);
  $(1);
  $(2);
  $(y);
  return undefined;
};
f(3);
f(4);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "50" );
const a = function() {
  debugger;
  $( 1 );
  $( 2 );
  $( NaN );
  return undefined;
};
a();
a();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: NaN
 - 5: 1
 - 6: 2
 - 7: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
