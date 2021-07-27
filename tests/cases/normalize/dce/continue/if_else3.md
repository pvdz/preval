# Preval test case

# if_else3.md

> Normalize > Dce > Continue > If else3
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    continue;
    $('fail');
  }
  continue;
}
$('after, wont eval due to infinite loop');
`````

## Pre Normal

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    continue;
    $(`fail`);
  }
  continue;
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      continue;
    } else {
      continue;
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Output

`````js filename=intro
let tmpIfTest = $(true);
while (tmpIfTest) {
  $(1);
  tmpIfTest = $(true);
}
$(`after, wont eval due to infinite loop`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
