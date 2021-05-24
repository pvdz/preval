# Preval test case

# try_catch_throw.md

> Flow > Try block throw early > Try catch throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    fail_early
    x = 'pass';
    throw 'yes';
  } catch {
    $('caught');
  }
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  try {
    fail_early;
    x = 'pass';
    throw 'yes';
  } catch {
    $('caught');
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  try {
    fail_early;
    x = 'pass';
    throw 'yes';
  } catch {
    $('caught');
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = 'fail';
try {
  fail_early;
  x = 'pass';
  throw 'yes';
} catch {
  $('caught');
}
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_early

## Result

Should call `$` with:
 - 1: 'caught'
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
