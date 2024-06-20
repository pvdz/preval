# Preval test case

# forin2.md

> Normalize > Dce > Continue > Forin2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
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
  for (let x of [10, 20]) {
    $continue: {
      {
        break $continue;
        $(`fail`);
      }
    }
  }
  $(`keep`);
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpForOfDeclRhs = [10, 20];
    let x = undefined;
    for (x of tmpForOfDeclRhs) {
    }
    $(`keep`);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let x = undefined;
    const tmpForOfDeclRhs = [10, 20];
    for (x of tmpForOfDeclRhs) {
    }
    $(`keep`);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## PST Output

With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    let b = undefined;
    const c = [ 10, 20 ];
    for (b of c) {

    }
    $( "keep" );
  }
  else {
    break;
  }
}
$( "after, wont eval due to infinite loop" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'keep'
 - 3: true
 - 4: 'keep'
 - 5: true
 - 6: 'keep'
 - 7: true
 - 8: 'keep'
 - 9: true
 - 10: 'keep'
 - 11: true
 - 12: 'keep'
 - 13: true
 - 14: 'keep'
 - 15: true
 - 16: 'keep'
 - 17: true
 - 18: 'keep'
 - 19: true
 - 20: 'keep'
 - 21: true
 - 22: 'keep'
 - 23: true
 - 24: 'keep'
 - 25: true
 - 26: 'keep'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
