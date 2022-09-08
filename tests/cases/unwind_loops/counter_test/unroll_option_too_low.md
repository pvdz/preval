# Preval test case

# unroll_option_too_low.md

> Unwind loops > Counter test > Unroll option too low
>
> Should be able to raise the amount of loop unrolls

#TODO

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
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
`````

## Output

`````js filename=intro
let counter = 20;
const arr = [`a`, `b`, `c`];
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
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
