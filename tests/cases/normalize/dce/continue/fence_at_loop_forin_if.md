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
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    if ($(1)) {
      $('pass');
      continue;
      $('fail');
    } else {
      $('do not visit');
      continue;
      $('fail');
    }
    $('fail -> DCE');
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
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x;
    for (x in tmpForInDeclRhs) {
      $('loop', x);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $('pass');
        continue;
      } else {
        $('do not visit');
        continue;
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
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x;
    for (x in tmpForInDeclRhs) {
      $('loop', x);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $('pass');
        continue;
      } else {
        $('do not visit');
        continue;
      }
    }
    $('infiloop, do not eliminate');
  } else {
    break;
  }
}
$('after (not invoked)');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1
 - 5: 'pass'
 - 6: 'loop', 'b'
 - 7: 1
 - 8: 'pass'
 - 9: 'infiloop, do not eliminate'
 - 10: true
 - 11: 'loop'
 - 12: 'loop', 'a'
 - 13: 1
 - 14: 'pass'
 - 15: 'loop', 'b'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'loop', 'b'
 - 25: 1
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
