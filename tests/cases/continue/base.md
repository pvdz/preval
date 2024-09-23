# Preval test case

# base.md

> Continue > Base
>
> Simple example

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  $('exit');
  break;
}
$('woohoo');




// SSA
function $continue() {
  if ($(false)) {
    $('uhoh');
    $continue(); // continue
    return;
  }
  $('exit');
  $break();
}
function $break() {
  $('woohoo');
}

$continue();


//function $continue() {
//  if ($(false)) {
//    $('uhoh');
//    $continue();
//    return;
//  } else {
//    $('exit');
//    $('woohoo');
//  }
//}
//
//$continue();

`````

## Pre Normal


`````js filename=intro
let $break = function () {
  debugger;
  $(`woohoo`);
};
let $continue = function () {
  debugger;
  if ($(false)) {
    $(`uhoh`);
    $continue();
    return;
  }
  $(`exit`);
  $break();
};
while (true) {
  $continue: {
    {
      if ($(false)) {
        $(`uhoh`);
        break $continue;
      }
      $(`exit`);
      break;
    }
  }
}
$(`woohoo`);
$continue();
`````

## Normalized


`````js filename=intro
let $break = function () {
  debugger;
  $(`woohoo`);
  return undefined;
};
let $continue = function () {
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
    $continue();
    return undefined;
  } else {
    $(`exit`);
    $break();
    return undefined;
  }
};
while (true) {
  $continue: {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      $(`uhoh`);
      break $continue;
    } else {
      $(`exit`);
      break;
    }
  }
}
$(`woohoo`);
$continue();
`````

## Output


`````js filename=intro
const $continue /*:()=>*/ = function () {
  debugger;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
    $continue();
    return undefined;
  } else {
    $(`exit`);
    $(`woohoo`);
    return undefined;
  }
};
const tmpIfTest$1 = $(false);
if (tmpIfTest$1) {
  while ($LOOP_UNROLL_10) {
    $(`uhoh`);
    const tmpIfTest$2 = $(false);
    if (tmpIfTest$2) {
    } else {
      $(`exit`);
      break;
    }
  }
} else {
  $(`exit`);
}
$(`woohoo`);
$continue();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( false );
  if (b) {
    $( "uhoh" );
    a();
    return undefined;
  }
  else {
    $( "exit" );
    $( "woohoo" );
    return undefined;
  }
};
const c = $( false );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( "uhoh" );
    const d = $( false );
    if (d) {

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
a();
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
