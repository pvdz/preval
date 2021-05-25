# Preval test case

# try_hell_p.md

> Flow > Try finally throw early > Try hell p
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    throw_early
    break stop; // Overrides the throw in the catch
  }
  x = 1;
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
    throw 'two';
  } finally {
    throw_early;
    break stop;
  }
  x = 1;
};
let x = 0;
f();
considerMutated(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpLabeledBlockFunc = function () {
    debugger;
    try {
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      throw_early;
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    }
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
  };
  const tmpAfterLabel = function () {
    debugger;
    x = 1;
    return undefined;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
let x = 0;
f();
considerMutated(x);
`````

## Output

`````js filename=intro
const tmpAfterLabel = function () {
  debugger;
  x = 1;
  return undefined;
};
const f = function () {
  debugger;
  try {
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    throw_early;
    tmpAfterLabel();
    return undefined;
  }
  tmpAfterLabel();
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