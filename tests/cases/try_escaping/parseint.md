# Preval test case

# parseint.md

> Try escaping > Parseint
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
while (true) {
  const x = String($('1')); // We can detect the type as string (or primitive) and assert not observable
  try {
    const y = parseInt(x); // Cannot throw without second arg so move it up
    $(y);
  } catch {
    $('keepme');
  }
}
`````

## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpStringFirstArg /*:unknown*/ = $(`1`);
  const x /*:string*/ = $coerce(tmpStringFirstArg, `string`);
  const y /*:number*/ = parseInt(x);
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const y = parseInt($coerce($(`1`), `string`));
  try {
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Pre Normal


`````js filename=intro
while (true) {
  const x = String($(`1`));
  try {
    const y = parseInt(x);
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpStringFirstArg = $(`1`);
  const x = $coerce(tmpStringFirstArg, `string`);
  try {
    const y = parseInt(x);
    $(y);
  } catch (e) {
    $(`keepme`);
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( "1" );
  const b = $coerce( a, "string" );
  const c = parseInt( b );
  try {
    $( c );
  }
  catch (d) {
    $( "keepme" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1'
 - 2: 1
 - 3: '1'
 - 4: 1
 - 5: '1'
 - 6: 1
 - 7: '1'
 - 8: 1
 - 9: '1'
 - 10: 1
 - 11: '1'
 - 12: 1
 - 13: '1'
 - 14: 1
 - 15: '1'
 - 16: 1
 - 17: '1'
 - 18: 1
 - 19: '1'
 - 20: 1
 - 21: '1'
 - 22: 1
 - 23: '1'
 - 24: 1
 - 25: '1'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
