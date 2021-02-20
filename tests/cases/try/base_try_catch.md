# Preval test case

# base_try_catch.md

> Try > Base try catch
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
}
$(3);
`````

## Normalized

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
}
$(3);
`````

## Output

`````js filename=intro
$(1);
try {
  $(2);
} catch (e) {
  $('fail');
}
$(3);
`````

## Globals

BAD@! Found 1 implicit global bindings:

e

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
