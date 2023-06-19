# Preval test case

# try.md

> Function splitting > Try
>
> A function that tests on a param and has two separate code paths based on that test might be splittable if we know all the args.

This exception was specifically aimed towards an obfuscator

#TODO

## Input

`````js filename=intro
function f(a) {
  try {
    if (a) {
      $('then');
    } else {
      $('else');
    }
  } catch {}
}

f(0);
f('ok');
f(true);
f(false);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  try {
    if (a) {
      $(`then`);
    } else {
      $(`else`);
    }
  } catch {}
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  try {
    if (a) {
      $(`then`);
    } else {
      $(`else`);
    }
  } catch {}
  return undefined;
};
f(0);
f(`ok`);
f(true);
f(false);
`````

## Output

`````js filename=intro
const tmpSplitTruthy = function () {
  debugger;
  try {
    $(`then`);
  } catch {}
  return undefined;
};
const tmpSplitFalsy = function () {
  debugger;
  try {
    $(`else`);
  } catch {}
  return undefined;
};
tmpSplitFalsy();
tmpSplitTruthy();
tmpSplitTruthy();
tmpSplitFalsy();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'else'
 - 2: 'then'
 - 3: 'then'
 - 4: 'else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same