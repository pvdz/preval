# Preval test case

# spread_inner_param.md

> Function trampoline > Call return > Spread inner param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const y = $('pass');
const f = function(x) {
  const r = $(...x);
  return r;
};
const q = f(y); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````

## Pre Normal


`````js filename=intro
const y = $(`pass`);
const f = function ($$0) {
  let x = $$0;
  debugger;
  const r = $(...x);
  return r;
};
const q = f(y);
$(q);
`````

## Normalized


`````js filename=intro
const y = $(`pass`);
const f = function ($$0) {
  let x = $$0;
  debugger;
  const r = $(...x);
  return r;
};
const q = f(y);
$(q);
`````

## Output


`````js filename=intro
const y = $(`pass`);
const q = $(...y);
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
