# Preval test case

# try_hell_e.md

> Flow > Try no throw > Try hell e
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  x = 1
} catch {

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
} finally {
}
considerMutated(x);
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
