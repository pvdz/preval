# Preval test case

# spread_inner_global.md

> Function trampoline > Call only > Spread inner global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

#TODO

## Input

`````js filename=intro
const x = $('pass');
const f = function() {
  $(...x);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Pre Normal

`````js filename=intro
const x = $('pass');
const f = function () {
  debugger;
  $(...x);
};
f();
`````

## Normalized

`````js filename=intro
const x = $('pass');
const f = function () {
  debugger;
  $(...x);
};
f();
`````

## Output

`````js filename=intro
const x = $('pass');
$(...x);
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
