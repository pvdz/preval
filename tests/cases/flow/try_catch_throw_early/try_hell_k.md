# Preval test case

# try_hell_k.md

> Flow > Try catch throw early > Try hell k
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    throw_early
    break foo;
  } catch {
    throw_early
    // Do not assume x will be 1 for it may still crash.
    x = 1
  } finally {
  }
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
foo: {
  try {
    throw_early;
    break foo;
  } catch (e) {
    throw_early;
    x = 1;
  } finally {
  }
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
foo: {
  try {
    throw_early;
    break foo;
  } catch (e) {
    throw_early;
    x = 1;
  } finally {
  }
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
  throw_early;
} catch (e) {
  throw_early;
  x = 1;
} finally {
}
considerMutated(x);
`````

## Globals

BAD@! Found 3 implicit global bindings:

throw_early, e, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
