# Preval test case

# spread_inner_param.md

> Function trampoline > Call only > Spread inner param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const y = $('pass');
const f = function(x) {
  $(...x);
};
f(y); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Pre Normal

`````js filename=intro
const y = $(`pass`);
const f = function ($$0) {
  let x = $$0;
  debugger;
  $(...x);
};
f(y);
`````

## Normalized

`````js filename=intro
const y = $(`pass`);
const f = function ($$0) {
  let x = $$0;
  debugger;
  $(...x);
  return undefined;
};
f(y);
`````

## Output

`````js filename=intro
const y = $(`pass`);
$(...y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'p', 'a', 's', 's'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
