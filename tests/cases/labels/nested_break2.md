# Preval test case

# nested_break2.md

> Labels > Nested break2
>
> At the time of creating this test, the nested labels a&b were not eliminated.
> There's a normalization step that will merge them.

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
    $(3);
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
const tmpIfTest = $(0);
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
