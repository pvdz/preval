# Preval test case

# try_hell_b.md

> Flow > Try no throw > Try hell b
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {

} catch {
  throw_early
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
  x = 1;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
considerMutated(x);
`````

## Output

`````js filename=intro
considerMutated(0);
`````

## PST Output

With rename=true

`````js filename=intro
considerMutated( 0 );
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
