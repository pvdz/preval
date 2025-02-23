# Preval test case

# while_double_labeled_break_dce.md

> Tofix > while double labeled break dce
>
> The while contains a double labeled break and is guaranteed to break to
> the label. At the time of writing, the $(3) was not DCE'd, preventing
> further reductions.

## Input

`````js filename=intro
a: {
  b: {
    while (true) {
      if ($(0)) {
        $(1);
        break a;
      }
      else {
        $(2);
        break b;
      }
    }
    $(3); // unreachable
  }
}
`````

## Pre Normal


`````js filename=intro
a: {
  b: {
    while (true) {
      if ($(0)) {
        $(1);
        break a;
      } else {
        $(2);
        break b;
      }
    }
    $(3);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(1);
    break;
  } else {
    $(2);
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 1 );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
