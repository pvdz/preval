# Preval test case

# if-if-else.md

> ifelse > invert > if-if-else
>
> Test else-matching

The transform should not cause the `else $(4)` part to become matched to the first `if`.

## Input

`````js filename=intro
if ($(-1)) $(0);
if (!$(1))
  if ($(2)) $(3);
  else $(4);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(-1);
if (tmpIfTest) {
  $(0);
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
} else {
  const tmpIfTest$2 = $(2);
  if (tmpIfTest$2) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: -1
 - 2: 0
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
