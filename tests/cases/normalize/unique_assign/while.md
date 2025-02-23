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
while (true) {
  const tmpIfTest = a < 10;
  if (tmpIfTest) {
    a = a + 1;
    $(a);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = a < 10;
if (tmpIfTest) {
  a = a + 1;
  while ($LOOP_UNROLL_10) {
    $(a);
    const tmpIfTest$1 /*:boolean*/ = a < 10;
    if (tmpIfTest$1) {
      a = a + 1;
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
  while ($LOOP_UNROLL_10) {
    $( a );
    const c = a < 10;
    if (c) {
      a = a + 1;
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
