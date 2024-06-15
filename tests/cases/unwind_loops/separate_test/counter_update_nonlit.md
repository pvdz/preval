# Preval test case

# counter_update_nonlit.md

> Unwind loops > Separate test > Counter update nonlit
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += max) $(i);
`````

## Pre Normal


`````js filename=intro
const max = $(10);
{
  let i = 0;
  while (i < 10) {
    $(i);
    i += max;
  }
}
`````

## Normalized


`````js filename=intro
const max = $(10);
let i = 0;
let tmpIfTest = i < 10;
while (true) {
  if (tmpIfTest) {
    $(i);
    i = i + max;
    tmpIfTest = i < 10;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const max = $(10);
$(0);
const tmpClusterSSA_i = 0 + max;
const tmpClusterSSA_tmpIfTest = tmpClusterSSA_i < 10;
if (tmpClusterSSA_tmpIfTest) {
  $(tmpClusterSSA_i);
  let tmpClusterSSA_i$1 = tmpClusterSSA_i + max;
  let tmpClusterSSA_tmpIfTest$1 = tmpClusterSSA_i$1 < 10;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpIfTest$1) {
      $(tmpClusterSSA_i$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + max;
      tmpClusterSSA_tmpIfTest$1 = tmpClusterSSA_i$1 < 10;
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( 0 );
const b = 0 + a;
const c = b < 10;
if (c) {
  $( b );
  let d = b + a;
  let e = d < 10;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( d );
      d = d + a;
      e = d < 10;
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
