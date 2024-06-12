# Preval test case

# branched_write_read_update_before.md

> While > Branched write read update before
>
> A loop with a branch where a binding is updated in one side and read in another...

#TODO

## Input

`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  if (x % 2) {
    $(++x, 'write');
  } else {
    // The write before will always change x so the ++x cannot be observed here
    $(x, 'read');
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  if (x % 2) {
    $(++x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## Normalized


`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  const tmpIfTest = x % 2;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    x = x + 1;
    let tmpCalleeParam = x;
    const tmpCalleeParam$1 = `write`;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    $(x, `read`);
  }
}
`````

## Output


`````js filename=intro
$(1);
const tmpClusterSSA_x = $(10);
const tmpIfTest = tmpClusterSSA_x % 2;
if (tmpIfTest) {
  const tmpClusterSSA_x$1 = tmpClusterSSA_x + 1;
  $(tmpClusterSSA_x$1, `write`);
} else {
  $(tmpClusterSSA_x, `read`);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x$2 = $(10);
  const tmpIfTest$1 = tmpClusterSSA_x$2 % 2;
  if (tmpIfTest$1) {
    const tmpClusterSSA_x$4 = tmpClusterSSA_x$2 + 1;
    $(tmpClusterSSA_x$4, `write`);
  } else {
    $(tmpClusterSSA_x$2, `read`);
  }
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 10 );
const b = a % 2;
if (b) {
  const c = a + 1;
  $( c, "write" );
}
else {
  $( a, "read" );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = $( 10 );
  const e = d % 2;
  if (e) {
    const f = d + 1;
    $( f, "write" );
  }
  else {
    $( d, "read" );
  }
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 10, 'read'
 - 4: 10
 - 5: 10, 'read'
 - 6: 10
 - 7: 10, 'read'
 - 8: 10
 - 9: 10, 'read'
 - 10: 10
 - 11: 10, 'read'
 - 12: 10
 - 13: 10, 'read'
 - 14: 10
 - 15: 10, 'read'
 - 16: 10
 - 17: 10, 'read'
 - 18: 10
 - 19: 10, 'read'
 - 20: 10
 - 21: 10, 'read'
 - 22: 10
 - 23: 10, 'read'
 - 24: 10
 - 25: 10, 'read'
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
