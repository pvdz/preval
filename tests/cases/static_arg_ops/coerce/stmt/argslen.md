# Preval test case

# argslen.md

> Static arg ops > Coerce > Stmt > Argslen

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  $coerce(arguments.length, 'number');
  $(1);
  $(2);
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
};
f();
f();
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  $coerce(tmpPrevalAliasArgumentsLen, `number`);
  $(1);
  $(2);
};
f(3);
f(4);
`````

## Normalized


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  $coerce(tmpPrevalAliasArgumentsLen, `number`);
  $(1);
  $(2);
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
 - 4: 1
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
