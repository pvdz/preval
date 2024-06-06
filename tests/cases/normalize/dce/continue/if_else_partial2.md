# Preval test case

# if_else_partial2.md

> Normalize > Dce > Continue > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
  } else {
    continue;
    $('fail');
  }
  $('keep');
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $continue: {
    {
      if ($(1)) {
      } else {
        break $continue;
        $(`fail`);
      }
      $(`keep`);
    }
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $(`keep`);
      } else {
        break $continue;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(1);
  if (tmpIfTest$1) {
    $(`keep`);
  } else {
  }
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        $(`keep`);
      } else {
      }
      tmpClusterSSA_tmpIfTest = $(true);
    } else {
      break;
    }
  }
} else {
}
$(`after, wont eval due to infinite loop`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1 );
  if (b) {
    $( "keep" );
  }
  let c = $( true );
  while ($LOOP_UNROLL_10) {
    if (c) {
      const d = $( 1 );
      if (d) {
        $( "keep" );
      }
      c = $( true );
    }
    else {
      break;
    }
  }
}
$( "after, wont eval due to infinite loop" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'keep'
 - 4: true
 - 5: 1
 - 6: 'keep'
 - 7: true
 - 8: 1
 - 9: 'keep'
 - 10: true
 - 11: 1
 - 12: 'keep'
 - 13: true
 - 14: 1
 - 15: 'keep'
 - 16: true
 - 17: 1
 - 18: 'keep'
 - 19: true
 - 20: 1
 - 21: 'keep'
 - 22: true
 - 23: 1
 - 24: 'keep'
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
