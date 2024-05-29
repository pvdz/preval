# Preval test case

# try_hell_g.md

> Flow > Try block throw early > Try hell g
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} catch {

} finally {
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
} finally {
  x = 1;
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  try {
    fail_early;
  } catch (e) {}
} finally {
  x = 1;
}
considerMutated(x);
`````

## Output

`````js filename=intro
try {
  try {
    fail_early;
  } catch (e) {}
} finally {
}
considerMutated(1);
`````

## PST Output

With rename=true

`````js filename=intro
try {
  try {
    fail_early;
  }
catch (e) {

  }
}
finally {

}
considerMutated( 1 );
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
