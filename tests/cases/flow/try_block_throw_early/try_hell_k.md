# Preval test case

# try_hell_k.md

> Flow > Try block throw early > Try hell k
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    fail_early
    break foo;
  } catch {
    // The break should not prevent this assignment from being picked up
    x = 2;
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
    fail_early;
    break foo;
  } catch (e) {
    x = 2;
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
    fail_early;
    break foo;
  } catch (e) {
    x = 2;
  } finally {
  }
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 2;
} finally {
}
considerMutated(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
}
catch (e) {
  a = 2;
}
finally {

}
considerMutated( a );
`````

## Globals

BAD@! Found 3 implicit global bindings:

fail_early, e, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
