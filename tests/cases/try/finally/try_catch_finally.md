# Preval test case

# try_catch_finally.md

> Try > Finally > Try catch finally
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
} finally {
  $(3);
}
`````

## Pre Normal

`````js filename=intro
try {
  $(1);
} catch (e) {
  $(2);
} finally {
  $(3);
}
`````

## Normalized

`````js filename=intro
try {
  try {
    $(1);
  } catch (e) {
    $(2);
  }
} finally {
  $(3);
}
`````

## Output

`````js filename=intro
try {
  try {
    $(1);
  } catch (e) {
    $(2);
  }
} finally {
  $(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
try {
  try {
    $( 1 );
  }
catch (e) {
    $( 2 );
  }
}
finally {
  $( 3 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
