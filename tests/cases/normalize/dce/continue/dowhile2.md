# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  do {
    $('loop');
    continue;
    $('fail');
  } while ($(true));
  $('keep, wont eval due to infinite loop');
}
$('after, wont eval due to infinite loop');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpDoWhileTest;
    do {
      $('loop');
      continue;
    } while (tmpDoWhileTest);
    $('keep, wont eval due to infinite loop');
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: true
 - 6: 'loop'
 - 7: true
 - 8: 'loop'
 - 9: true
 - 10: 'loop'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: true
 - 16: 'loop'
 - 17: true
 - 18: 'loop'
 - 19: true
 - 20: 'loop'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: BAD?!
 - 1: true
 - 2: 'loop'
 - 3: 'keep, wont eval due to infinite loop'
 - 4: true
 - 5: 'loop'
 - 6: 'keep, wont eval due to infinite loop'
 - 7: true
 - 8: 'loop'
 - 9: 'keep, wont eval due to infinite loop'
 - 10: true
 - 11: 'loop'
 - 12: 'keep, wont eval due to infinite loop'
 - 13: true
 - 14: 'loop'
 - 15: 'keep, wont eval due to infinite loop'
 - 16: true
 - 17: 'loop'
 - 18: 'keep, wont eval due to infinite loop'
 - 19: true
 - 20: 'loop'
 - 21: 'keep, wont eval due to infinite loop'
 - 22: true
 - 23: 'loop'
 - 24: 'keep, wont eval due to infinite loop'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Final output calls: BAD!!
 - eval returned: undefined
