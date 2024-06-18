# Preval test case

# while.md

> Normalize > Unique assign > While
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

## Input

`````js filename=intro
let a = $(1);
while (a < 10) {
  a += 1;
  $(a);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(1);
while (a < 10) {
  a += 1;
  $(a);
}
$(a);
`````

## Normalized


`````js filename=intro
let a = $(1);
let tmpIfTest = a < 10;
while (true) {
  if (tmpIfTest) {
    a = a + 1;
    $(a);
    tmpIfTest = a < 10;
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = $(1);
const tmpIfTest = a < 10;
if (tmpIfTest) {
  a = a + 1;
  $(a);
  let tmpClusterSSA_tmpIfTest = a < 10;
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      a = a + 1;
      $(a);
      tmpClusterSSA_tmpIfTest = a < 10;
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
const b = a < 10;
if (b) {
  a = a + 1;
  $( a );
  let c = a < 10;
  while ($LOOP_UNROLL_10) {
    if (c) {
      a = a + 1;
      $( a );
      c = a < 10;
    }
    else {
      break;
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
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
