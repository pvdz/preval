# Preval test case

# labeled_continue.md

> Labels > Continue > Labeled continue
>
> 

#TODO

## Input

`````js filename=intro
let x = $(1);
A: while (true) {
  while (true) {
    $(x);
    x = $(2);
    if ($) {
      continue A;
    }
    x = $(3);
    $(x);
    break;
  }
}
$(x); // unreachable
`````

## Pre Normal

`````js filename=intro
let x = $(1);
A: while (true) {
  $continue: {
    {
      while (true) {
        $(x);
        x = $(2);
        if ($) {
          break $continue;
        }
        x = $(3);
        $(x);
        break;
      }
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
while (true) {
  $continue: {
    while (true) {
      $(x);
      x = $(2);
      if ($) {
        break $continue;
      } else {
        x = $(3);
        $(x);
        break;
      }
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = $(1);
while (true) {
  let $tmpLoopUnrollCheck = true;
  $(x);
  x = $(2);
  if ($) {
  } else {
    x = $(3);
    $(x);
    $tmpLoopUnrollCheck = false;
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      $(x);
      x = $(2);
      if ($) {
      } else {
        x = $(3);
        $(x);
        break;
      }
    }
  } else {
  }
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
while (true) {
  let b = true;
  $( a );
  a = $( 2 );
  if ($) {

  }
  else {
    a = $( 3 );
    $( a );
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      $( a );
      a = $( 2 );
      if ($) {

      }
      else {
        a = $( 3 );
        $( a );
        break;
      }
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
