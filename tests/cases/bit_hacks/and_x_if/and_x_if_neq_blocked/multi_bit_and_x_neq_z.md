# Preval test case

# multi_bit_and_x_neq_z.md

> Bit hacks > And x if > And x if neq blocked > Multi bit and x neq z
>
> In some cases we can predict bitwise results or meta results

#TODO

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
if (y !== 3) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
if (y !== 3) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
const tmpIfTest = y !== 3;
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
$(y);
const tmpIfTest = y === 3;
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
 - 2: 200
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
