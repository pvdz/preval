# Preval test case

# try_hell_p.md

> Flow > Try no throw > Try hell p
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
    throw `one`;
  } catch (e) {
    throw `two`;
  } finally {
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
  const tmpAfterLabel = function () {
    debugger;
    x = 1;
    return undefined;
  };
  try {
    try {
      throw `one`;
    } catch (e) {
      throw `two`;
    }
  } finally {
    const tmpReturnArg = tmpAfterLabel();
    return tmpReturnArg;
  }
  const tmpReturnArg$1 = tmpAfterLabel();
  return tmpReturnArg$1;
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
    try {
      throw `one`;
    } catch (e) {
      throw `two`;
    }
  } finally {
    x = 1;
    return undefined;
  }
  x = 1;
  return undefined;
};
let x = 0;
f();
considerMutated(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    try {
      throw "one";
    }
catch (e) {
      throw "two";
    }
  }
finally {
    b = 1;
    return undefined;
  }
  b = 1;
  return undefined;
};
let b = 0;
a();
considerMutated( b );
`````

## Globals

BAD@! Found 2 implicit global bindings:

e, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
