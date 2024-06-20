# Preval test case

# zero_writes2.md

> Redundant writes > Zero writes2

## Input

`````js filename=intro
let y = $(true);
while (true) {
  if (y) {
    $(y, 'before');
    let x = undefined;
    const obj = { a: 1, b: 2 };
    for (x in obj) {
      $(x, y);
      continue;
    }
    $(x, y, 'after');
    y = $(true);
  } else {
    break;
  }
}
$(x, 'last'); // unknown ref (!)
`````

## Pre Normal


`````js filename=intro
let y = $(true);
while (true) {
  if (y) {
    $(y, `before`);
    let x$1 = undefined;
    const obj = { a: 1, b: 2 };
    for (x$1 in obj) {
      $continue: {
        {
          $(x$1, y);
          break $continue;
        }
      }
    }
    $(x$1, y, `after`);
    y = $(true);
  } else {
    break;
  }
}
$(x, `last`);
`````

## Normalized


`````js filename=intro
let y = undefined;
while (true) {
  y = $(true);
  if (y) {
    $(y, `before`);
    let x$1 = undefined;
    const obj = { a: 1, b: 2 };
    for (x$1 in obj) {
      $(x$1, y);
    }
    $(x$1, y, `after`);
  } else {
    break;
  }
}
$(x, `last`);
`````

## Output


`````js filename=intro
while (true) {
  const tmpClusterSSA_y = $(true);
  if (tmpClusterSSA_y) {
    $(tmpClusterSSA_y, `before`);
    let x$1 = undefined;
    const obj = { a: 1, b: 2 };
    for (x$1 in obj) {
      $(x$1, tmpClusterSSA_y);
    }
    $(x$1, tmpClusterSSA_y, `after`);
  } else {
    break;
  }
}
$(x, `last`);
`````

## PST Output

With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    $( a, "before" );
    let b = undefined;
    const c = {
      a: 1,
      b: 2,
    };
    for (b in c) {
      $( b, a );
    }
    $( b, a, "after" );
  }
  else {
    break;
  }
}
$( x, "last" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: true
 - 2: true, 'before'
 - 3: 'a', true
 - 4: 'b', true
 - 5: 'b', true, 'after'
 - 6: true
 - 7: true, 'before'
 - 8: 'a', true
 - 9: 'b', true
 - 10: 'b', true, 'after'
 - 11: true
 - 12: true, 'before'
 - 13: 'a', true
 - 14: 'b', true
 - 15: 'b', true, 'after'
 - 16: true
 - 17: true, 'before'
 - 18: 'a', true
 - 19: 'b', true
 - 20: 'b', true, 'after'
 - 21: true
 - 22: true, 'before'
 - 23: 'a', true
 - 24: 'b', true
 - 25: 'b', true, 'after'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
