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
let tmpIfTest = $(true);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $tmpLoopUnrollCheck = false;
  } else {
    $(`keep, do not eval`);
    tmpIfTest = $(true);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        break;
      } else {
        $(`keep, do not eval`);
        tmpIfTest = $(true);
      }
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true );
let b = true;
if (a) {
  const c = $( 1 );
  if (c) {
    b = false;
  }
  else {
    $( "keep, do not eval" );
    a = $( true );
  }
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      const d = $( 1 );
      if (d) {
        break;
      }
      else {
        $( "keep, do not eval" );
        a = $( true );
      }
    }
    else {
      break;
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
