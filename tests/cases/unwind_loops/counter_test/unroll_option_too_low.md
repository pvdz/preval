# Preval test case

# unroll_option_too_low.md

> Unwind loops > Counter test > Unroll option too low
>
> Should be able to raise the amount of loop unrolls

## Options

- unroll=15

## Input

`````js filename=intro
const arr = [`a`,`b`,`c`,];
let counter = 20;
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
`````

## Pre Normal


`````js filename=intro
const arr = [`a`, `b`, `c`];
let counter = 20;
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`];
let counter = 20;
while (true) {
  if (counter) {
    const e = arr.shift();
    arr.push(e);
    counter = counter - 1;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
let tmpClusterSSA_counter$2 = 8;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 - 1;
  if (tmpClusterSSA_counter$2) {
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 8;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  a = a - 1;
  if (a) {

  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
