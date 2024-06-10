# Preval test case

# try_catch_if_return_else_throw.md

> Flow > Try catch throw early > Try catch if return else throw
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    if ($) {
      return;
    } else {
      x = 'pass';
      throw 'too';
    }
    x = 'fail2'; // This is dead code either way
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
    if ($) {
      return;
    } else {
      x = `pass`;
      throw `too`;
    }
    x = `fail2`;
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
    if ($) {
      return undefined;
    } else {
      x = `pass`;
      throw `too`;
    }
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
$inlinedFunction: {
  let x = `fail`;
  try {
    if ($) {
      break $inlinedFunction;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    throw_early;
    $(`caught`);
  }
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
$inlinedFunction: {
  let a = "fail";
  try {
    if ($) {
      break $inlinedFunction;
    }
    else {
      a = "pass";
      throw "too";
    }
  }
catch (b) {
    throw_early;
    $( "caught" );
  }
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

throw_early

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
