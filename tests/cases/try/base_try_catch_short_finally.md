# Preval test case

# base_try_catch_short_finally.md

> Try > Base try catch short finally
>
> Try base cases

#TODO

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch {
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
} catch {
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
} catch {
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
} catch {
  $('fail');
} finally {
  $(3);
}
$(4);
`````

## Globals

None

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
