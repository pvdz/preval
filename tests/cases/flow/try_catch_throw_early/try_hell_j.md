# Preval test case

# try_hell_j.md

> Flow > Try catch throw early > Try hell j
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    throw_early
  } finally {
    // The finally always executes so there's no question that x mutates
    x = 1
  }
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    throw_early;
  } finally {
    x = 1;
  }
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    throw_early;
  } finally {
    x = 1;
  }
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
foo: {
  try {
    break foo;
  } catch {
    throw_early;
  } finally {
    x = 1;
  }
}
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