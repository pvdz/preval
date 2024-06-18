# Preval test case

# base_global_loop.md

> Ssa > Base global loop
>
> Contrived example

## Input

`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(3);
$(x);
while (true) {
  $(++x);
  if (x > 5) break;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(3);
$(x);
while (true) {
  const tmpCallCallee = $;
  x = x + 1;
  let tmpCalleeParam = x;
  tmpCallCallee(tmpCalleeParam);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(x);
`````

## Output


`````js filename=intro
const x = $(3);
$(x);
let tmpClusterSSA_x = x + 1;
$(tmpClusterSSA_x);
const tmpIfTest = tmpClusterSSA_x > 5;
if (tmpIfTest) {
} else {
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_x = tmpClusterSSA_x + 1;
    $(tmpClusterSSA_x);
    const tmpIfTest$1 = tmpClusterSSA_x > 5;
    if (tmpIfTest$1) {
      break;
    } else {
    }
  }
}
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 3 );
$( a );
let b = a + 1;
$( b );
const c = b > 5;
if (c) {

}
else {
  while ($LOOP_UNROLL_10) {
    b = b + 1;
    $( b );
    const d = b > 5;
    if (d) {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
