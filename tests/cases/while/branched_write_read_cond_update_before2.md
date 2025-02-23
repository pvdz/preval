# Preval test case

# branched_write_read_cond_update_before2.md

> While > Branched write read cond update before2
>
> A loop with a branch where a binding is updated in one side and read in another...

## Input

`````js filename=intro
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const imanumberandilovethrees /*:number*/ = x % 3;
  let itooamanumberjack /*:primitive*/ = false;
  if (imanumberandilovethrees) {
    x = $(10, `ten`);
    itooamanumberjack = x % 2;
  } else {
    itooamanumberjack = x % 2;
  }
  if (itooamanumberjack) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const imanumberandilovethrees = x % 3;
  let itooamanumberjack = false;
  if (imanumberandilovethrees) {
    x = $(10, `ten`);
    itooamanumberjack = x % 2;
  } else {
    itooamanumberjack = x % 2;
  }
  if (itooamanumberjack) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## Normalized


`````js filename=intro
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const imanumberandilovethrees = x % 3;
  let itooamanumberjack = false;
  if (imanumberandilovethrees) {
    x = $(10, `ten`);
    itooamanumberjack = x % 2;
  } else {
    itooamanumberjack = x % 2;
  }
  if (itooamanumberjack) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const imanumberandilovethrees /*:number*/ = x % 3;
  let itooamanumberjack /*:number*/ = 0;
  if (imanumberandilovethrees) {
    x = $(10, `ten`);
    itooamanumberjack = x % 2;
  } else {
    itooamanumberjack = x % 2;
  }
  if (itooamanumberjack) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a % 3;
  let c = 0;
  if (b) {
    a = $( 10, "ten" );
    c = a % 2;
  }
  else {
    c = a % 2;
  }
  if (c) {
    a = a + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10, 'ten'
 - 3: 10, 'read'
 - 4: 10, 'ten'
 - 5: 10, 'read'
 - 6: 10, 'ten'
 - 7: 10, 'read'
 - 8: 10, 'ten'
 - 9: 10, 'read'
 - 10: 10, 'ten'
 - 11: 10, 'read'
 - 12: 10, 'ten'
 - 13: 10, 'read'
 - 14: 10, 'ten'
 - 15: 10, 'read'
 - 16: 10, 'ten'
 - 17: 10, 'read'
 - 18: 10, 'ten'
 - 19: 10, 'read'
 - 20: 10, 'ten'
 - 21: 10, 'read'
 - 22: 10, 'ten'
 - 23: 10, 'read'
 - 24: 10, 'ten'
 - 25: 10, 'read'
 - 26: 10, 'ten'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
