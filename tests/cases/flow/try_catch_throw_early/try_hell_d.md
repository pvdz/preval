# Preval test case

# try_hell_d.md

> Flow > Try catch throw early > Try hell d
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {
  throw_early
} finally {

}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch {
  throw_early;
} finally {
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch {
  throw_early;
} finally {
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch {
  throw_early;
} finally {
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
