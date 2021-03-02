# Preval test case

# if_else_partial2.md

> Normalize > Dce > Break > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
  } else {
    break;
    $('fail');
  }
  $('keep');
}
$('after');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      $('keep');
    } else {
      break;
    }
  } else {
    break;
  }
}
$('after');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      $('keep');
    } else {
      break;
    }
  } else {
    break;
  }
}
$('after');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'keep'
 - 4: true
 - 5: 1
 - 6: 'keep'
 - 7: true
 - 8: 1
 - 9: 'keep'
 - 10: true
 - 11: 1
 - 12: 'keep'
 - 13: true
 - 14: 1
 - 15: 'keep'
 - 16: true
 - 17: 1
 - 18: 'keep'
 - 19: true
 - 20: 1
 - 21: 'keep'
 - 22: true
 - 23: 1
 - 24: 'keep'
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
