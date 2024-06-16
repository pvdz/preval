# Preval test case

# argslen_elim.md

> Constants > Argslen elim

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = (arguments.length, 'number');
  $(1);
  $(2);
  $(y);
};
f(3);
f(4);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  const y = (tmpPrevalAliasArgumentsLen, `number`);
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
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let c = $$0;
  debugger;
  const y = `number`;
  $(1);
  $(2);
  $(y);
  return undefined;
};
f(3);
f(4);
`````

## Output


`````js filename=intro
$(`50`);
const f = function () {
  debugger;
  $(1);
  $(2);
  $(`number`);
  return undefined;
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
$( "50" );
const a = function() {
  debugger;
  $( 1 );
  $( 2 );
  $( "number" );
  return undefined;
};
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50'
 - 2: 1
 - 3: 2
 - 4: 'number'
 - 5: 1
 - 6: 2
 - 7: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same