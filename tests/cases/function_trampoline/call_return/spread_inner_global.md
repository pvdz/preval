# Preval test case

# spread_inner_global.md

> Function trampoline > Call return > Spread inner global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const x = $('pass');
const f = function() {
  const r = $(...x);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const x = $(`pass`);
const f = function () {
  debugger;
  const r = $(...x);
  return r;
};
const q = f();
$(q);
`````

## Normalized


`````js filename=intro
const x = $(`pass`);
const f = function () {
  debugger;
  const r = $(...x);
  return r;
};
const q = f();
$(q);
`````

## Output


`````js filename=intro
const x = $(`pass`);
const q = $(...x);
$(q);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
const b = $( ...a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'p', 'a', 's', 's'
 - 3: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
