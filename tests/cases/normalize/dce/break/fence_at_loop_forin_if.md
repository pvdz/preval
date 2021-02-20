# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Break > Fence at loop forin if
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
      break;
      $('fail');
    } else {
      $('do not visit');
      break;
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
        break;
      } else {
        $('do not visit');
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
    const tmpForInDeclRhs = { a: 1, b: 2 };
    let x;
    for (x in tmpForInDeclRhs) {
      $('loop', x);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        $('pass');
        break;
      } else {
        $('do not visit');
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

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1
 - 5: 'pass'
 - 6: 'infiloop, do not eliminate'
 - 7: true
 - 8: 'loop'
 - 9: 'loop', 'a'
 - 10: 1
 - 11: 'pass'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop', 'a'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
