# Preval test case

# base.md

> Let aliases > V2 > Base
>
> Let aliasing is when a let var gets aliased, something else happens that may spy, and then 
> the alias is read even though the let could not have been changed by that time, yet.
> (v2 resolves this particular case)

## Input

`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (counter < 5) {
    const alias = counter;                  // <- redundant
    const chr = `abcdef`.charAt(counter);
    arr[alias] = chr;                       // <- arr[counter]
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````

## Pre Normal


`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (counter < 5) {
    const alias = counter;
    const chr = `abcdef`.charAt(counter);
    arr[alias] = chr;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````

## Normalized


`````js filename=intro
let counter = 0;
const arr = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest = counter < 5;
  if (tmpIfTest) {
    const alias = counter;
    const chr = `abcdef`.charAt(counter);
    arr[alias] = chr;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````

## Output


`````js filename=intro
let counter /*:number*/ = 0;
const arr /*:array*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:boolean*/ = counter < 5;
  if (tmpIfTest) {
    const chr /*:string*/ = `abcdef`.charAt(counter);
    arr[counter] = chr;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = a < 5;
  if (c) {
    const d = "abcdef".charAt( a );
    b[a] = d;
    a = a + 1;
  }
  else {
    break;
  }
}
$( b );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
let counter = 0;
const arr = [];
while (true) {
  if (counter < 5) {
    const chr = `abcdef`.charAt(counter);
    arr[counter] = chr;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c', 'd', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
