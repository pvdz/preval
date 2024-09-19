# Preval test case

# division.md

> Try escaping > Division
>
> Note: binary ops can coerce the args so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
while (true) {
  const x = Number($(1));
  const y = Number($(2));
  try {
    const z = x / y;
    $(z);
  } catch {
    $('keepme');
  }
}
`````

## Pre Normal


`````js filename=intro
while (true) {
  const x = Number($(1));
  const y = Number($(2));
  try {
    const z = x / y;
    $(z);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpStringFirstArg = $(1);
  const x = $coerce(tmpStringFirstArg, `number`);
  const tmpStringFirstArg$1 = $(2);
  const y = $coerce(tmpStringFirstArg$1, `number`);
  try {
    const z = x / y;
    $(z);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg = $(1);
  const x /*:number*/ = $coerce(tmpStringFirstArg, `number`);
  const tmpStringFirstArg$1 = $(2);
  const y /*:number*/ = $coerce(tmpStringFirstArg$1, `number`);
  const z /*:number*/ = x / y;
  try {
    $(z);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 1 );
  const b = $coerce( a, "number" );
  const c = $( 2 );
  const d = $coerce( c, "number" );
  const e = b / d;
  try {
    $( e );
  }
  catch (f) {
    $( "keepme" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 0.5
 - 4: 1
 - 5: 2
 - 6: 0.5
 - 7: 1
 - 8: 2
 - 9: 0.5
 - 10: 1
 - 11: 2
 - 12: 0.5
 - 13: 1
 - 14: 2
 - 15: 0.5
 - 16: 1
 - 17: 2
 - 18: 0.5
 - 19: 1
 - 20: 2
 - 21: 0.5
 - 22: 1
 - 23: 2
 - 24: 0.5
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
