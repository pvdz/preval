# Preval test case

# fence_at_loop.md

> normalize > dce > continue > fence_at_loop
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  while ($(true)) {
    $('loop');
    break;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $('loop');
        break;
      } else {
        break;
      }
    }
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $('loop');
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $('loop');
        break;
      } else {
        break;
      }
    }
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: 'infiloop, do not eliminate'
 - 6: true
 - 7: 'loop'
 - 8: true
 - 9: 'loop'
 - 10: 'infiloop, do not eliminate'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: 'infiloop, do not eliminate'
 - 16: true
 - 17: 'loop'
 - 18: true
 - 19: 'loop'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: 'infiloop, do not eliminate'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
