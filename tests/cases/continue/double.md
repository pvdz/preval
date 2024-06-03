# Preval test case

# double.md

> Continue > Double
>
> Simple example

#TODO

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  if ($(false)) {
    $('neither');
    continue;
  }
  $('exit');
  break;
}
$('woohoo');

while (true) {
  let continued = false;
  if ($(false)) {
    $('uhoh');
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(false)) {
      $('neither');
    } else {
      continued = true;
    }
  }
  if (!continued) {
    $('exit');
    break;
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
      }
      if ($(false)) {
        $(`neither`);
        break $continue;
      }
      $(`exit`);
      break;
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
  }
  if (!continued) {
    if ($(false)) {
      $(`neither`);
    } else {
      continued = true;
    }
  }
  if (!continued) {
    $(`exit`);
    break;
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
      const tmpIfTest$1 = $(false);
      if (tmpIfTest$1) {
        $(`neither`);
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
  const tmpIfTest$3 = $(false);
  if (tmpIfTest$3) {
    $(`uhoh`);
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$5 = $(false);
    if (tmpIfTest$5) {
      $(`neither`);
    } else {
      continued = true;
    }
    if (continued) {
    } else {
      $(`exit`);
      break;
    }
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
  const tmpIfTest$1 = $(false);
  if (tmpIfTest$1) {
    $(`neither`);
  } else {
    $(`exit`);
    $tmpLoopUnrollCheck$1 = false;
  }
}
if ($tmpLoopUnrollCheck$1) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
      $(`uhoh`);
    } else {
      const tmpIfTest$4 = $(false);
      if (tmpIfTest$4) {
        $(`neither`);
      } else {
        $(`exit`);
        break;
      }
    }
  }
} else {
}
$(`woohoo`);
let $tmpLoopUnrollCheck = true;
let continued = false;
const tmpIfTest$3 = $(false);
if (tmpIfTest$3) {
  $(`uhoh`);
} else {
  continued = true;
}
if (continued) {
} else {
  const tmpIfTest$5 = $(false);
  if (tmpIfTest$5) {
    $(`neither`);
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    $(`exit`);
    $tmpLoopUnrollCheck = false;
  }
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    let continued$1 = false;
    const tmpIfTest$6 = $(false);
    if (tmpIfTest$6) {
      $(`uhoh`);
    } else {
      continued$1 = true;
    }
    if (continued$1) {
    } else {
      const tmpIfTest$8 = $(false);
      if (tmpIfTest$8) {
        $(`neither`);
      } else {
        continued$1 = true;
      }
      if (continued$1) {
      } else {
        $(`exit`);
        break;
      }
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
  const c = $( false );
  if (c) {
    $( "neither" );
  }
  else {
    $( "exit" );
    a = false;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $( false );
    if (d) {
      $( "uhoh" );
    }
    else {
      const e = $( false );
      if (e) {
        $( "neither" );
      }
      else {
        $( "exit" );
        break;
      }
    }
  }
}
$( "woohoo" );
let f = true;
let g = false;
const h = $( false );
if (h) {
  $( "uhoh" );
}
else {
  g = true;
}
if (g) {

}
else {
  const i = $( false );
  if (i) {
    $( "neither" );
  }
  else {
    g = true;
  }
  if (g) {

  }
  else {
    $( "exit" );
    f = false;
  }
}
if (f) {
  while ($LOOP_UNROLL_10) {
    let j = false;
    const k = $( false );
    if (k) {
      $( "uhoh" );
    }
    else {
      j = true;
    }
    if (j) {

    }
    else {
      const l = $( false );
      if (l) {
        $( "neither" );
      }
      else {
        j = true;
      }
      if (j) {

      }
      else {
        $( "exit" );
        break;
      }
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
 - 2: false
 - 3: 'exit'
 - 4: 'woohoo'
 - 5: false
 - 6: false
 - 7: false
 - 8: false
 - 9: false
 - 10: false
 - 11: false
 - 12: false
 - 13: false
 - 14: false
 - 15: false
 - 16: false
 - 17: false
 - 18: false
 - 19: false
 - 20: false
 - 21: false
 - 22: false
 - 23: false
 - 24: false
 - 25: false
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
