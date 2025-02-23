# Preval test case

# this.md

> Static arg ops > Coerce > Stmt > This

## Input

`````js filename=intro
let x = $('50');
const f = function (c) {
  $coerce(this, 'number');
  $(1);
  $(2);
};
f(3);
f(4);
`````

## Pre Normal


`````js filename=intro
let x = $(`50`);
const f = function ($$0) {
  const tmpPrevalAliasThis = this;
  let c = $$0;
  debugger;
  $coerce(tmpPrevalAliasThis, `number`);
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
  const tmpPrevalAliasThis = this;
  let c = $$0;
  debugger;
  $coerce(tmpPrevalAliasThis, `number`);
  $(1);
  $(2);
  return undefined;
};
f(3);
f(4);
`````

## Output


`````js filename=intro
$(`50`);
const f /*:()=>*/ = function () {
  debugger;
  $(1);
  $(2);
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
 - 4: 1
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
