# Preval test case

# if_else_partial.md

> Normalize > Dce > Break > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $('fail');
  }
  $('keep, do not eval');
}
$('after');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  if ($(1)) {
    break;
    $(`fail`);
  }
  $(`keep, do not eval`);
}
$(`after`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      break;
    } else {
      $(`keep, do not eval`);
    }
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
  } else {
    $(`keep, do not eval`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        const tmpIfTest$4 /*:unknown*/ = $(1);
        if (tmpIfTest$4) {
          break;
        } else {
          $(`keep, do not eval`);
        }
      } else {
        break;
      }
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1 );
  if (b) {

  }
  else {
    $( "keep, do not eval" );
    while ($LOOP_UNROLL_10) {
      const c = $( true );
      if (c) {
        const d = $( 1 );
        if (d) {
          break;
        }
        else {
          $( "keep, do not eval" );
        }
      }
      else {
        break;
      }
    }
  }
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
