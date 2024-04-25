# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Continue > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x of [1, 2]) {
    $('loop', x);
    continue;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  $(`loop`);
  for (let x of [1, 2]) {
    $(`loop`, x);
    continue;
    $(`fail`);
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
    const tmpForOfDeclRhs = [1, 2];
    let x = undefined;
    for (x of tmpForOfDeclRhs) {
      $(`loop`, x);
      continue;
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
    const tmpForOfDeclRhs = [1, 2];
    for (x of tmpForOfDeclRhs) {
      $(`loop`, x);
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
    const c = [ 1, 2 ];
    for (b of c) {
      $( "loop", b );
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
 - 3: 'loop', 1
 - 4: 'loop', 2
 - 5: 'infiloop, do not eliminate'
 - 6: true
 - 7: 'loop'
 - 8: 'loop', 1
 - 9: 'loop', 2
 - 10: 'infiloop, do not eliminate'
 - 11: true
 - 12: 'loop'
 - 13: 'loop', 1
 - 14: 'loop', 2
 - 15: 'infiloop, do not eliminate'
 - 16: true
 - 17: 'loop'
 - 18: 'loop', 1
 - 19: 'loop', 2
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 1
 - 24: 'loop', 2
 - 25: 'infiloop, do not eliminate'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
