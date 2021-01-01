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
{
  let ifTestTmp = $(-1);
  if (ifTestTmp) {
    $(0);
  }
}
{
  let ifTestTmp_2 = !$(1);
  if (ifTestTmp_2) {
    let ifTestTmp_1 = $(2);
    if (ifTestTmp_1) {
      $(3);
    } else {
      $(4);
    }
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = $(-1);
if (ifTestTmp) {
  $(0);
}
let ifTestTmp_2 = !$(1);
if (ifTestTmp_2) {
  let ifTestTmp_1 = $(2);
  if (ifTestTmp_1) {
    $(3);
  } else {
    $(4);
  }
}
`````
