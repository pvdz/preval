# Preval test case

# single_bit_and_x_neq_0.md

> Bit hacks > And x if > And x if neq > Single bit and x neq 0
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y !== 0) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y !== 0) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const tmpIfTest = y !== 0;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32768
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
