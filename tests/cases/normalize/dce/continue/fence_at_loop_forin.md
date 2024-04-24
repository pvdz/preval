# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Continue > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
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
  for (let x in { a: 1, b: 2 }) {
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
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x = undefined;
    for (x in tmpForInDeclRhs) {
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
    const tmpForInDeclRhs = { a: 1, b: 2 };
    for (x in tmpForInDeclRhs) {
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
    const c = {
a: 1,
b: 2
    ;
    for (b in c) {
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
 - 3: 'loop', 'a'
 - 4: 'loop', 'b'
 - 5: 'infiloop, do not eliminate'
 - 6: true
 - 7: 'loop'
 - 8: 'loop', 'a'
 - 9: 'loop', 'b'
 - 10: 'infiloop, do not eliminate'
 - 11: true
 - 12: 'loop'
 - 13: 'loop', 'a'
 - 14: 'loop', 'b'
 - 15: 'infiloop, do not eliminate'
 - 16: true
 - 17: 'loop'
 - 18: 'loop', 'a'
 - 19: 'loop', 'b'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 'a'
 - 24: 'loop', 'b'
 - 25: 'infiloop, do not eliminate'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
