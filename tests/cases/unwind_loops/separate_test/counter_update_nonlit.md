# Preval test case

# counter_update_nonlit.md

> Unwind loops > Separate test > Counter update nonlit
>
> Unrolling loops

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
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    $(i);
    i = i + max;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const max = $(10);
$(0);
const tmpClusterSSA_i /*:primitive*/ = 0 + max;
const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i < 10;
if (tmpIfTest$1) {
  $(tmpClusterSSA_i);
  let tmpClusterSSA_i$1 = tmpClusterSSA_i + max;
  while ($LOOP_UNROLL_9) {
    const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_i$1 < 10;
    if (tmpIfTest$2) {
      $(tmpClusterSSA_i$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + max;
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
  while ($LOOP_UNROLL_9) {
    const e = d < 10;
    if (e) {
      $( d );
      d = d + a;
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
