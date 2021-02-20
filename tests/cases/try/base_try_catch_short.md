# Preval test case

# base_try_catch_short.md

> Try > Base try catch short
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
}
$(3);
`````

## Normalized

`````js filename=intro
$(1);
try {
  $(2);
} catch {
  $('fail');
}
$(3);
`````

## Output

`````js filename=intro
$(1);
try {
  $(2);
} catch {
  $('fail');
}
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
