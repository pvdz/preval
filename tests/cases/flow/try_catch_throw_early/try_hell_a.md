# Preval test case

# try_hell_a.md

> Flow > Try catch throw early > Try hell a
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
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch (e) {
  throw_early;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  x = 1;
} catch (e) {
  throw_early;
}
considerMutated(x);
`````

## Output

`````js filename=intro
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
considerMutated( 1 );
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
