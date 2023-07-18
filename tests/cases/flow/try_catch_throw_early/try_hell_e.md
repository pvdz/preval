# Preval test case

# try_hell_e.md

> Flow > Try catch throw early > Try hell e
>
> Bunch of try/catch/finally cases

#TODO

## Input

`````js filename=intro
let x = 0;
try {
  throw_early
} catch {
  throw_early
  // Should not pick up on this
  x = 1
} finally {

}
considerMutated(x) // always true
`````

## Pre Normal

`````js filename=intro
let x = 0;
try {
  throw_early;
} catch (e) {
  throw_early;
  x = 1;
} finally {
}
considerMutated(x);
`````

## Normalized

`````js filename=intro
let x = 0;
try {
  throw_early;
} catch (e) {
  throw_early;
  x = 1;
} finally {
}
considerMutated(x);
`````

## Output

`````js filename=intro
let x = 0;
try {
  throw_early;
} catch (e) {
  throw_early;
  x = 1;
} finally {
}
considerMutated(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
try {
  throw_early;
}
catch (e) {
  throw_early;
  a = 1;
}
finally {

}
considerMutated( a );
`````

## Globals

BAD@! Found 3 implicit global bindings:

throw_early, e, considerMutated

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
