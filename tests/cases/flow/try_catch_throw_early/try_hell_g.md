# Preval test case

# try_hell_g.md

> Flow > Try catch throw early > Try hell g
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {

} catch {
  throw_early
} finally {
  x = 1
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
} catch (e) {
  throw_early;
} finally {
  x = 1;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
x = 1;
considerMutated(x);
`````

## Output

`````js filename=intro
considerMutated(1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
