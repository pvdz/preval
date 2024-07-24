# Preval test case

# assign_prop_left.md

> Try escaping > Assign prop left
>
> Typical rotation obfuscation.

## Input

`````js filename=intro
{
  let a = $(1);
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      arr[286] = a;
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
      arr[286] = a;
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
    arr[286] = a;
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
const a = $(1);
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr[286] = a;
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
const a = $( 1 );
const b = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    b[286] = a;
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
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
