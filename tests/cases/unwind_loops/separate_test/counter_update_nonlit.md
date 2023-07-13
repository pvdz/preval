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
const i = 0 + max;
const tmpClusterSSA_tmpIfTest = i < 10;
if (tmpClusterSSA_tmpIfTest) {
  $(i);
  let tmpClusterSSA_i = i + max;
  let tmpClusterSSA_tmpIfTest$1 = tmpClusterSSA_i < 10;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpIfTest$1) {
      $(tmpClusterSSA_i);
      tmpClusterSSA_i = tmpClusterSSA_i + max;
      tmpClusterSSA_tmpIfTest$1 = tmpClusterSSA_i < 10;
    } else {
      break;
    }
  }
} else {
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
