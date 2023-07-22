# Preval test case

# try_hell_q.md

> Flow > Try no throw > Try hell q
>
> Bunch of try/catch/finally cases0

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    x = 1;
    throw 'one';
  } catch {
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
    x = 1;
    throw `one`;
  } catch (e) {
    throw `two`;
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
    x = 1;
    throw `one`;
  } catch (e) {
    throw `two`;
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
  x = 1;
  try {
    throw `one`;
  } catch (e) {
    throw `two`;
  } finally {
    return undefined;
  }
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
  b = 1;
  try {
    throw "one";
  }
catch (e) {
    throw "two";
  }
finally {
    return undefined;
  }
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
