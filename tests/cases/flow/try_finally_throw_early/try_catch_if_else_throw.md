# Preval test case

# try_catch_if_else_throw.md

> Flow > Try finally throw early > Try catch if else throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    if ($) {
      x = 'pass';
      throw 'yes';
    } else {
      throw 'too';
    }
  } catch {
    $(x, 'mutation is observable in the catch');
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
    if ($) {
      x = `pass`;
      throw `yes`;
    } else {
      throw `too`;
    }
  } catch (e) {
    $(x, `mutation is observable in the catch`);
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
    if ($) {
      x = `pass`;
      throw `yes`;
    } else {
      throw `too`;
    }
  } catch (e) {
    $(x, `mutation is observable in the catch`);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = `fail`;
try {
  if ($) {
    x = `pass`;
    throw `yes`;
  } else {
    throw `too`;
  }
} catch (e) {
  $(x, `mutation is observable in the catch`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = "fail";
try {
  if ($) {
    a = "pass";
    throw "yes";
  }
  else {
    throw "too";
  }
}
catch (e) {
  $( a, "mutation is observable in the catch" );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 'pass', 'mutation is observable in the catch'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
