# Preval test case

# if-else.md

> Continue > If-else
>
> Simple example

#TODO

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  } else {
    $('exit');
    break;
  }
}

$('woohoo');

while (true) {
  let continued = false;
  if ($(false)) {
    $('uhoh');
  } else {
    continued = true;
    $('exit');
    break;
  }
  if (!continued) {
    
  }
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
      } else {
        $(`exit`);
        break;
      }
    }
  }
}
$(`woohoo`);
while (true) {
  let continued = false;
  if ($(false)) {
    $(`uhoh`);
  } else {
    continued = true;
    $(`exit`);
    break;
  }
  if (!continued) {
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
      break;
    }
  }
}
$(`woohoo`);
while (true) {
  let continued = false;
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`uhoh`);
  } else {
    continued = true;
    $(`exit`);
    break;
  }
}
$(`woohoo`);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck$1 = true;
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(`uhoh`);
} else {
  $(`exit`);
  $tmpLoopUnrollCheck$1 = false;
}
if ($tmpLoopUnrollCheck$1) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`uhoh`);
    } else {
      $(`exit`);
      break;
    }
  }
} else {
}
$(`woohoo`);
let $tmpLoopUnrollCheck = true;
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $(`uhoh`);
} else {
  $(`exit`);
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
      $(`uhoh`);
    } else {
      $(`exit`);
      break;
    }
  }
} else {
}
$(`woohoo`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( false );
if (b) {
  $( "uhoh" );
}
else {
  $( "exit" );
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const c = $( false );
    if (c) {
      $( "uhoh" );
    }
    else {
      $( "exit" );
      break;
    }
  }
}
$( "woohoo" );
let d = true;
const e = $( false );
if (e) {
  $( "uhoh" );
}
else {
  $( "exit" );
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    const f = $( false );
    if (f) {
      $( "uhoh" );
    }
    else {
      $( "exit" );
      break;
    }
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
 - 3: 'woohoo'
 - 4: false
 - 5: 'exit'
 - 6: 'woohoo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
