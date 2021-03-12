# Preval test case

# base_try_catch_finally.md

> Try > Base try catch finally
>
> Try base cases

#TODO

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Pre Normal

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Normalized

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Output

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
