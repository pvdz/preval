# Preval test case

# while9.md

> Ref tracking > Done > While-if > While9
>
> A let binding defined in an outer block than the nested while

## Options

## Input

`````js filename=intro
let x = 1;
if ($) {
  $('if', x);
  try {
    $('try', x);
    while (true) {
      $('try-while', x);
      while (true) {
        $('try-while-while', x);
        if ($) {
          $(x); // Can still see 2 due to outer loop
        } else {
          $(x);
          x = 2;
          break;
        }
      }
      if ($()) {
        $('end?', x);
        break;
      }
      $('no end', x);
    }
    $('after while', x);
  } catch (e) {
    $('catch', x);
  } finally {
    $('finally', x);
  }
  $('posttry', x);
} else {
  $('oh', x);
}
$('end', x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x);
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
while (true) {
  let $tmpLoopUnrollCheck = true;
  $(x);
  if ($) {
  } else {
    x = 2;
    $tmpLoopUnrollCheck = false;
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      $(x);
      if ($) {
      } else {
        x = 2;
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
let a = 1;
while (true) {
  let b = true;
  $( a );
  if ($) {

  }
  else {
    a = 2;
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      $( a );
      if ($) {

      }
      else {
        a = 2;
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
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
