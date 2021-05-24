# Preval test case

# try_break_through.md

> Flow > Try catch throw early > Try break through
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    try {
      if ($) {
        return;
      } else {
        x = 'pass';
        throw 'too';
      }
      x = 'fail2'; // This is dead code either way
    } catch {
      $('caught');
    }
    $(x);
  }
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  foo: {
    try {
      if ($) {
        return;
      } else {
        x = 'pass';
        throw 'too';
      }
      x = 'fail2';
    } catch {
      $('caught');
    }
    $(x);
  }
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 'fail';
  try {
    if ($) {
      return undefined;
    } else {
      x = 'pass';
      throw 'too';
    }
    x = 'fail2';
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
const f = function () {
  debugger;
  let x = 'fail';
  try {
    if ($) {
      return undefined;
    } else {
      throw 'too';
    }
    x = 'fail2';
  } catch {
    $('caught');
  }
  $(x);
  return undefined;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
