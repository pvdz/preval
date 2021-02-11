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
  
  do {
    $('loop');
    continue;
    $('fail');
  } while ($(true));

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
    let tmpDoWhileTest;
    do {
      $('loop');
      continue;
    } while (tmpDoWhileTest);
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: true
 - 5: 'loop'
 - 6: true
 - 7: 'loop'
 - 8: true
 - 9: 'loop'
 - 10: true
 - 11: 'loop'
 - 12: true
 - 13: 'loop'
 - 14: true
 - 15: 'loop'
 - 16: true
 - 17: 'loop'
 - 18: true
 - 19: 'loop'
 - 20: true
 - 21: 'loop'
 - 22: true
 - 23: 'loop'
 - 24: true
 - 25: 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: BAD?!
 - 1: true
 - 2: 'loop'
 - 3: 'loop'
 - 4: 'infiloop, do not eliminate'
 - 5: true
 - 6: 'loop'
 - 7: 'loop'
 - 8: 'infiloop, do not eliminate'
 - 9: true
 - 10: 'loop'
 - 11: 'loop'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop'
 - 16: 'infiloop, do not eliminate'
 - 17: true
 - 18: 'loop'
 - 19: 'loop'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Final output calls: BAD!!
 - eval returned: undefined
