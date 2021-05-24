# Preval test case

# try_hell_g.md

> Flow > Try finally throw early > Try hell g
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {

} catch {

} finally {
  throw_early
  x = 1
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
} catch {
} finally {
  throw_early;
  x = 1;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
} catch {
} finally {
  throw_early;
  x = 1;
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
} catch {
} finally {
  throw_early;
  x = 1;
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
