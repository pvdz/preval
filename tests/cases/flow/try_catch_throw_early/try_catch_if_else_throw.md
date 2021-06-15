# Preval test case

# try_catch_if_else_throw.md

> Flow > Try catch throw early > Try catch if else throw
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
    throw_early
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
  } catch {
    throw_early;
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
  } catch {
    throw_early;
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
} catch {
  throw_early;
  $(x, `mutation is observable in the catch`);
}
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

throw_early

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
