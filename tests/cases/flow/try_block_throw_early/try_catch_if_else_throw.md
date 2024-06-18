# Preval test case

# try_catch_if_else_throw.md

> Flow > Try block throw early > Try catch if else throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    fail_early
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
    fail_early;
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
    fail_early;
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
  fail_early;
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
  fail_early;
  if ($) {
    a = "pass";
    throw "yes";
  }
  else {
    throw "too";
  }
}
catch (b) {
  $( a, "mutation is observable in the catch" );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_early

## Result

Should call `$` with:
 - 1: 'fail', 'mutation is observable in the catch'
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
