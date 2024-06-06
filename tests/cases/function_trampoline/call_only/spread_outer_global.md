# Preval test case

# spread_outer_global.md

> Function trampoline > Call only > Spread outer global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const x = $('pass');
const f = function(y) {
  $(y);
};
f(...x); // This should NOT be inlined (for now) because we can't safely reason about the spread
         // (In the future we could still translate this case by $(x[0]) but that'll be a very specific rule)
`````

## Pre Normal


`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  let y = $$0;
  debugger;
  $(y);
};
f(...x);
`````

## Normalized


`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  let y = $$0;
  debugger;
  $(y);
  return undefined;
};
f(...x);
`````

## Output


`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  const y = $$0;
  debugger;
  $(y);
  return undefined;
};
f(...x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
const b = function($$0 ) {
  const c = d;
  debugger;
  $( c );
  return undefined;
};
b( ... a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
