# Preval test case

# forin1.md

> Normalize > Dce > Continue > Forin1
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  for (let x in {a: 1, b: 2}) {
    continue;
  }
  $('keep');
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  for (let x in { a: 1, b: 2 }) {
    continue;
  }
  $(`keep`);
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x = undefined;
    for (x in tmpForInDeclRhs) {
      continue;
    }
    $(`keep`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    let x = undefined;
    const tmpForInDeclRhs = { a: 1, b: 2 };
    for (x in tmpForInDeclRhs) {
    }
    $(`keep`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true );
while (true) {
  if (a) {
    let b = undefined;
    const c = {
a: 1,
b: 2
    ;
    for (b in c) {

    }
    $( "keep" );
    a = $( true );
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
