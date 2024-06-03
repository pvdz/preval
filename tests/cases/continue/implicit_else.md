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
const tmpIfTest$1 = $(false);
if (tmpIfTest$1) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$2 = $(false);
if (tmpIfTest$2) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$4 = $(false);
if (tmpIfTest$4) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$5 = $(false);
if (tmpIfTest$5) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$6 = $(false);
if (tmpIfTest$6) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$7 = $(false);
if (tmpIfTest$7) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$8 = $(false);
if (tmpIfTest$8) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$9 = $(false);
if (tmpIfTest$9) {
  $(`uhoh`);
} else {
  $(`exit`);
}
const tmpIfTest$10 = $(false);
if (tmpIfTest$10) {
  $(`uhoh`);
} else {
  $(`exit`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$11 = $(false);
  if (tmpIfTest$11) {
    $(`uhoh`);
  } else {
    $(`exit`);
  }
}
$(`woohoo`);
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
const b = $( false );
if (b) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const c = $( false );
if (c) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const d = $( false );
if (d) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const e = $( false );
if (e) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const f = $( false );
if (f) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const g = $( false );
if (g) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const h = $( false );
if (h) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const i = $( false );
if (i) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const j = $( false );
if (j) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
const k = $( false );
if (k) {
  $( "uhoh" );
}
else {
  $( "exit" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = $( false );
  if (l) {
    $( "uhoh" );
  }
  else {
    $( "exit" );
  }
}
$( "woohoo" );
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
