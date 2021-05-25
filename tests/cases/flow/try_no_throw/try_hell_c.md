# Preval test case

# try_hell_c.md

> Flow > Try no throw > Try hell c
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {

} finally {
  x = 1
}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
} finally {
  x = 1;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
} finally {
  x = 1;
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
} finally {
  x = 1;
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