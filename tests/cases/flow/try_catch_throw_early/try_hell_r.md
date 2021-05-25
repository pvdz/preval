# Preval test case

# try_hell_r.md

> Flow > Try catch throw early > Try hell r
>
> Bunch of try/catch/finally cases0

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
    throw_early
    x = 2;
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
considerMutated(x) // always true (!)
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  stop: try {
    throw 'one';
  } catch {
    throw_early;
    x = 2;
    throw 'two';
  } finally {
    break stop;
  }
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    throw 'one';
  } catch {
    throw_early;
    x = 2;
    throw 'two';
  } finally {
    return undefined;
  }
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  try {
    throw 'one';
  } catch {
    throw_early;
    x = 2;
    throw 'two';
  } finally {
    return undefined;
  }
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## Globals

BAD@! Found 2 implicit global bindings:

throw_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same