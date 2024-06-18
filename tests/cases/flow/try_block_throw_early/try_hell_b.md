# Preval test case

# try_hell_b.md

> Flow > Try block throw early > Try hell b
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} catch {
  x = 1
}
considerMutated(x) // always true
`````

## Pre Normal


`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
}
considerMutated(x);
`````

## Normalized


`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
}
considerMutated(x);
`````

## Output


`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
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
catch (b) {
  a = 1;
}
considerMutated( a );
`````

## Globals

BAD@! Found 2 implicit global bindings:

fail_early, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
