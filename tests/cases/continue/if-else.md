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
const tmpIfTest = $(false);
if (tmpIfTest) {
  $(`uhoh`);
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
  $(`exit`);
}
$(`woohoo`);
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $(`uhoh`);
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
  $(`exit`);
}
$(`woohoo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "uhoh" );
  while ($LOOP_UNROLL_10) {
    const b = $( false );
    if (b) {
      $( "uhoh" );
    }
    else {
      $( "exit" );
      break;
    }
  }
}
else {
  $( "exit" );
}
$( "woohoo" );
const c = $( false );
if (c) {
  $( "uhoh" );
  while ($LOOP_UNROLL_10) {
    const d = $( false );
    if (d) {
      $( "uhoh" );
    }
    else {
      $( "exit" );
      break;
    }
  }
}
else {
  $( "exit" );
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
