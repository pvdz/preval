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
var tmpArg;
tmpArg = -1;
if ($(tmpArg)) {
  $(0);
}
if (!$(1)) {
  if ($(2)) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
if ($(tmpArg)) {
  $(0);
}
if ($(1));
else {
  if ($(2)) {
    $(3);
  } else {
    $(4);
  }
}
`````
