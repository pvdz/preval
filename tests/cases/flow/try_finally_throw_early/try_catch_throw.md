# Preval test case

# try_catch_throw.md

> Flow > Try finally throw early > Try catch throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
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
  let x = `fail`;
  try {
    x = `pass`;
    throw `yes`;
  } catch {
    $(`caught`);
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    x = `pass`;
    throw `yes`;
  } catch {
    $(`caught`);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
try {
  throw `yes`;
} catch {
  $(`caught`);
}
$(`pass`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'caught'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
