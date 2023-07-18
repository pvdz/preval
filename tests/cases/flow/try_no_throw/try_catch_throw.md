# Preval test case

# try_catch_throw.md

> Flow > Try no throw > Try catch throw
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
  } catch (e) {
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
  } catch (e) {
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
} catch (e) {
  $(`caught`);
}
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  throw "yes";
}
catch (e) {
  $( "caught" );
}
$( "pass" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 'caught'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
