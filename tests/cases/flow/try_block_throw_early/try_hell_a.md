# Preval test case

# try_hell_a.md

> Flow > Try block throw early > Try hell a
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
  x = 1
} catch {

}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
} catch (e) {}
considerMutated(x);
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
