# Preval test case

# broken_loop_unroll.md

> Tofix > Broken loop unroll
>
> There's a bug in the loop unroll when the while body contains a labeled break.
> The unroll will copy and repeat the break even though the break may exit the loop.

#TODO

## Input

`````js filename=intro
while (true) {
  $continue: {
    $(1);
    while (true) {
      $(2);
      break $continue;
    }
  }
}
`````

## Pre Normal

`````js filename=intro
while (true) {
  $continue: {
    $(1);
    while (true) {
      $(2);
      break $continue;
    }
  }
}
`````

## Normalized

`````js filename=intro
while (true) {
  $continue: {
    $(1);
    while (true) {
      $(2);
      break $continue;
    }
  }
}
`````

## Output

`````js filename=intro
while (true) {
  $continue: {
    $(1);
    while (true) {
      $(2);
      break $continue;
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while (true) {
  $continue:   {
    $( 1 );
    while (true) {
      $( 2 );
      break $continue;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
