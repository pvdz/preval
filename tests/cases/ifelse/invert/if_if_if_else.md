# Preval test case

# if_if_if_else.md

> Ifelse > Invert > If if if else
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

## Pre Normal


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
} else {
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
} else {
  const tmpIfTest$3 = $(2);
  if (tmpIfTest$3) {
    $(3);
  } else {
    $(4);
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest = $(-1);
if (tmpIfTest) {
  $(0);
} else {
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
} else {
  const tmpIfTest$3 = $(2);
  if (tmpIfTest$3) {
    $(3);
  } else {
    $(4);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( -1 );
if (a) {
  $( 0 );
}
const b = $( 1 );
if (b) {

}
else {
  const c = $( 2 );
  if (c) {
    $( 3 );
  }
  else {
    $( 4 );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - 2: 0
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
