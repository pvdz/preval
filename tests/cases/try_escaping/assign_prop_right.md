# Preval test case

# assign_prop_right.md

> Try escaping > Assign prop right
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  let a = $(1);
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      a = arr[286];
      $(a);
      if (a) {
        break;
      } else {
        
      }
    } catch (P) {
      $('fail');
    }
  }
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = $(1);
  const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      a = arr[286];
      $(a);
      if (a) {
        break;
      } else {
      }
    } catch (P) {
      $(`fail`);
    }
  }
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = $(1);
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    a = arr[286];
    $(a);
    if (a) {
      break;
    } else {
    }
  } catch (P) {
    $(`fail`);
  }
}
$(a);
`````

## Output


`````js filename=intro
$(1);
let a = 1;
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = arr[286];
  try {
    $(a);
    if (a) {
      break;
    } else {
    }
  } catch (P) {
    $(`fail`);
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
let a = 1;
const b = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = b[ 286 ];
  try {
    $( a );
    if (a) {
      break;
    }
  }
  catch (c) {
    $( "fail" );
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - 7: undefined
 - 8: undefined
 - 9: undefined
 - 10: undefined
 - 11: undefined
 - 12: undefined
 - 13: undefined
 - 14: undefined
 - 15: undefined
 - 16: undefined
 - 17: undefined
 - 18: undefined
 - 19: undefined
 - 20: undefined
 - 21: undefined
 - 22: undefined
 - 23: undefined
 - 24: undefined
 - 25: undefined
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
