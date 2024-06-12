# Preval test case

# implicit_else.md

> Continue > Implicit else
>

#TODO

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  $('exit');
}
$('woohoo');
`````

## Pre Normal


`````js filename=intro
while (true) {
  $continue: {
    {
      if ($(false)) {
        $(`uhoh`);
        break $continue;
      }
      $(`exit`);
    }
  }
}
$(`woohoo`);
`````

## Normalized


`````js filename=intro
while (true) {
  $continue: {
    const tmpIfTest = $(false);
    if (tmpIfTest) {
      $(`uhoh`);
      break $continue;
    } else {
      $(`exit`);
    }
  }
}
$(`woohoo`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(`uhoh`);
} else {
  $(`exit`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`uhoh`);
  } else {
    $(`exit`);
  }
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( false );
  if (b) {
    $( "uhoh" );
  }
  else {
    $( "exit" );
  }
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 'exit'
 - 3: false
 - 4: 'exit'
 - 5: false
 - 6: 'exit'
 - 7: false
 - 8: 'exit'
 - 9: false
 - 10: 'exit'
 - 11: false
 - 12: 'exit'
 - 13: false
 - 14: 'exit'
 - 15: false
 - 16: 'exit'
 - 17: false
 - 18: 'exit'
 - 19: false
 - 20: 'exit'
 - 21: false
 - 22: 'exit'
 - 23: false
 - 24: 'exit'
 - 25: false
 - 26: 'exit'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
