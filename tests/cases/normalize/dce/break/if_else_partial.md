# Preval test case

# if_else_partial.md

> Normalize > Dce > Break > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

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
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      break;
    } else {
      $(`keep, do not eval`);
      tmpIfTest = $(true);
    }
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
  } else {
    $(`keep, do not eval`);
    let tmpClusterSSA_tmpIfTest = $(true);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_tmpIfTest) {
        const tmpIfTest$2 = $(1);
        if (tmpIfTest$2) {
          break;
        } else {
          $(`keep, do not eval`);
          tmpClusterSSA_tmpIfTest = $(true);
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
    let c = $( true );
    while ($LOOP_UNROLL_10) {
      if (c) {
        const d = $( 1 );
        if (d) {
          break;
        }
        else {
          $( "keep, do not eval" );
          c = $( true );
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
