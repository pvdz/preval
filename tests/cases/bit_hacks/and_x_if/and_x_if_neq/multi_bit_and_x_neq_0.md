# Preval test case

# multi_bit_and_x_neq_0.md

> Bit hacks > And x if > And x if neq > Multi bit and x neq 0
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y !== 0) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const x = $(200);
const y = x & 200;
if (y !== 0) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y !== 0;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const x = $(200);
const y = x & 200;
const tmpIfTest = y === 0;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 200
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
