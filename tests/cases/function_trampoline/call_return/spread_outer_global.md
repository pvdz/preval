# Preval test case

# spread_outer_global.md

> Function trampoline > Call return > Spread outer global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const x = $('pass');
const f = function(y) {
  const r = $(y);
  return r;
};
const q = f(...x); // This should NOT be inlined (for now) because we can't safely reason about the spread
                   // (In the future we could still translate this case by $(x[0]) but that'll be a very specific rule)
$(q);
`````

## Pre Normal

`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  let y = $$0;
  debugger;
  const r = $(y);
  return r;
};
const q = f(...x);
$(q);
`````

## Normalized

`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  let y = $$0;
  debugger;
  const r = $(y);
  return r;
};
const q = f(...x);
$(q);
`````

## Output

`````js filename=intro
const x = $(`pass`);
const f = function ($$0) {
  const y = $$0;
  debugger;
  const r = $(y);
  return r;
};
const q = f(...x);
$(q);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'p'
 - 3: 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
