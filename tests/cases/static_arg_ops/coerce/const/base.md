# Preval test case

# base.md

> Static arg ops > Coerce > Const > Base

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  const y = $coerce(y, 'number');
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
  let c = $$0;
  debugger;
  const y = $coerce(y, `number`);
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
  let c = $$0;
  debugger;
  const y = $coerce(y, `number`);
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
throw `Preval: TDZ triggered for this read: y;`;
`````

## PST Output

With rename=true

`````js filename=intro
$( "50" );
throw "Preval: TDZ triggered for this read: y;";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '50'
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
