# Preval test case

# continue_twice2.md

> Assigns > Continue twice2
>
> Continue to outer loop

## Input

`````js filename=intro
{
  let x = 10;
  foo:
  while (true) {
    while (true) {
      const tmpIfTest = $(x);
      if (tmpIfTest) {
        continue foo;
      } else {
        x = 20;
        $(x);
      }
    }
    $(x);
    x = 40;
  }
  $(x);
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 10;
  foo: while (true) {
    $continue: {
      {
        while (true) {
          const tmpIfTest = $(x);
          if (tmpIfTest) {
            break $continue;
          } else {
            x = 20;
            $(x);
          }
        }
        $(x);
        x = 40;
      }
    }
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 10;
while (true) {
  nestedLoop: {
    const tmpIfTest = $(x);
    if (tmpIfTest) {
      break nestedLoop;
    } else {
      x = 20;
      $(x);
    }
  }
}
`````

## Output


`````js filename=intro
let x /*:number*/ = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
  } else {
    x = 20;
    $(20);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  if (b) {

  }
  else {
    a = 20;
    $( 20 );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - 4: 10
 - 5: 10
 - 6: 10
 - 7: 10
 - 8: 10
 - 9: 10
 - 10: 10
 - 11: 10
 - 12: 10
 - 13: 10
 - 14: 10
 - 15: 10
 - 16: 10
 - 17: 10
 - 18: 10
 - 19: 10
 - 20: 10
 - 21: 10
 - 22: 10
 - 23: 10
 - 24: 10
 - 25: 10
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
