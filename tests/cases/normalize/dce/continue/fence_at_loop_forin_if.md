# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Continue > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    if ($(1)) {
      $('pass');
      continue;
      $('fail');
    } else {
      $('do not visit');
      continue;
      $('fail');
    }
    $('fail -> DCE');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $(`loop`);
  for (let x in { a: 1, b: 2 }) {
    $continue: {
      {
        $(`loop`, x);
        if ($(1)) {
          $(`pass`);
          break $continue;
          $(`fail`);
        } else {
          $(`do not visit`);
          break $continue;
          $(`fail`);
        }
        $(`fail -> DCE`);
      }
    }
  }
  $(`infiloop, do not eliminate`);
}
$(`after (not invoked)`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x = undefined;
    for (x in tmpForInDeclRhs) {
      $continue: {
        $(`loop`, x);
        const tmpIfTest$1 = $(1);
        if (tmpIfTest$1) {
          $(`pass`);
          break $continue;
        } else {
          $(`do not visit`);
          break $continue;
        }
      }
    }
    $(`infiloop, do not eliminate`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## Output


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(`loop`);
    let x = undefined;
    const tmpForInDeclRhs = { a: 1, b: 2 };
    for (x in tmpForInDeclRhs) {
      $(`loop`, x);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $(`pass`);
      } else {
        $(`do not visit`);
      }
    }
    $(`infiloop, do not eliminate`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true );
while (true) {
  if (a) {
    $( "loop" );
    let b = undefined;
    const c = {
a: 1,
b: 2
    ;
    for (b in c) {
      $( "loop", b );
      const d = $( 1 );
      if (d) {
        $( "pass" );
      }
      else {
        $( "do not visit" );
      }
    }
    $( "infiloop, do not eliminate" );
    a = $( true );
  }
  else {
    break;
  }
}
$( "after (not invoked)" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1
 - 5: 'pass'
 - 6: 'loop', 'b'
 - 7: 1
 - 8: 'pass'
 - 9: 'infiloop, do not eliminate'
 - 10: true
 - 11: 'loop'
 - 12: 'loop', 'a'
 - 13: 1
 - 14: 'pass'
 - 15: 'loop', 'b'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'loop', 'b'
 - 25: 1
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
