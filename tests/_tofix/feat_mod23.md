# Preval test case

# feat_mod23.md

> Tests > Tofix > Feat mod23
>
> A loop with a branch where a binding is updated in one side and read in another...


in dit geval is de assignment naar tmpIfTest$3 niet relevant en kan het net zo goed undefined zijn. of zelfs een nummer default

let tmpIfTest$3 = false;
if (tmpIfTest$4) {
  x = $(10, `ten`);
  tmpIfTest$3 = x % 2;
} else {
  tmpIfTest$3 = x % 2;
}


existing test

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    // Since the 10-write may not happen, this read may observe the ++x
    $(x, 'read');
  }
  if (x % 3) {
    x = $(10, 'ten');
  }
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
  if (x % 3) {
    x = $(10, `ten`);
  }
}
`````

## Normalized


`````js filename=intro
let x = $(1);
while (true) {
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
  const tmpIfTest$1 = x % 3;
  if (tmpIfTest$1) {
    x = $(10, `ten`);
  } else {
  }
}
`````

## Output


`````js filename=intro
let x = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:number*/ = x % 2;
  if (tmpIfTest) {
    x = x + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
  const tmpIfTest$1 /*:number*/ = x % 3;
  if (tmpIfTest$1) {
    x = $(10, `ten`);
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a % 2;
  if (b) {
    a = a + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
  const c = a % 3;
  if (c) {
    a = $( 10, "ten" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 'write'
 - 3: 10, 'ten'
 - 4: 10, 'read'
 - 5: 10, 'ten'
 - 6: 10, 'read'
 - 7: 10, 'ten'
 - 8: 10, 'read'
 - 9: 10, 'ten'
 - 10: 10, 'read'
 - 11: 10, 'ten'
 - 12: 10, 'read'
 - 13: 10, 'ten'
 - 14: 10, 'read'
 - 15: 10, 'ten'
 - 16: 10, 'read'
 - 17: 10, 'ten'
 - 18: 10, 'read'
 - 19: 10, 'ten'
 - 20: 10, 'read'
 - 21: 10, 'ten'
 - 22: 10, 'read'
 - 23: 10, 'ten'
 - 24: 10, 'read'
 - 25: 10, 'ten'
 - 26: 10, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
