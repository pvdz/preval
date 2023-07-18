# Preval test case

# try_catch_throw.md

> Flow > Try catch throw early > Try catch throw
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
    throw_early
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
    throw_early;
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
    throw_early;
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
  throw_early;
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
  throw_early;
  $( "caught" );
}
$( "pass" );
`````

## Globals

BAD@! Found 2 implicit global bindings:

e, throw_early

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
