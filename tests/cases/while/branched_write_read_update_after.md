# Preval test case

# branched_write_read_update_after.md

> While > Branched write read update after
>
> A loop with a branch where a binding is updated in one side and read in another...

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    // The write afterwards will always change x so the ++x cannot be observed here
    $(x, 'read');
  }
  x = $(10);
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, `write`);
  } else {
    $(x, `read`);
  }
  x = $(10);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
while (true) {
  const tmpIfTest = x % 2;
  if (tmpIfTest) {
    x = x + 1;
    let tmpCalleeParam = x;
    $(tmpCalleeParam, `write`);
  } else {
    $(x, `read`);
  }
  x = $(10);
}
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:number*/ = x % 2;
  if (tmpIfTest) {
    const tmpClusterSSA_x /*:primitive*/ = x + 1;
    $(tmpClusterSSA_x, `write`);
  } else {
    $(x, `read`);
  }
  x = $(10);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a % 2;
  if (b) {
    const c = a + 1;
    $( c, "write" );
  }
  else {
    $( a, "read" );
  }
  a = $( 10 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 'write'
 - 3: 10
 - 4: 10, 'read'
 - 5: 10
 - 6: 10, 'read'
 - 7: 10
 - 8: 10, 'read'
 - 9: 10
 - 10: 10, 'read'
 - 11: 10
 - 12: 10, 'read'
 - 13: 10
 - 14: 10, 'read'
 - 15: 10
 - 16: 10, 'read'
 - 17: 10
 - 18: 10, 'read'
 - 19: 10
 - 20: 10, 'read'
 - 21: 10
 - 22: 10, 'read'
 - 23: 10
 - 24: 10, 'read'
 - 25: 10
 - 26: 10, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
