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
let i = 0 + max;
let tmpClusterSSA_tmpIfTest = i < 10;
const $tmpLoopUnrollCheck = tmpClusterSSA_tmpIfTest;
if (tmpClusterSSA_tmpIfTest) {
  $(i);
  i = i + max;
  tmpClusterSSA_tmpIfTest = i < 10;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpIfTest) {
      $(i);
      i = i + max;
      tmpClusterSSA_tmpIfTest = i < 10;
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
let b = 0 + a;
let c = b < 10;
const d = c;
if (c) {
  $( b );
  b = b + a;
  c = b < 10;
}
if (d) {
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( b );
      b = b + a;
      c = b < 10;
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
