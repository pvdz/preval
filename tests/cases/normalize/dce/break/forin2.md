# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  for (let x of [10, 20]) {
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
    {
      const tmpForOfDeclRhs = [10, 20];
      let x;
      for (x of tmpForOfDeclRhs) {
        break;
      }
    }
    $('keep');
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
    {
      const tmpForOfDeclRhs = [10, 20];
      let x;
      for (x of tmpForOfDeclRhs) {
        break;
      }
    }
    $('keep');
  } else {
    break;
  }
}
$('after');
`````

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same