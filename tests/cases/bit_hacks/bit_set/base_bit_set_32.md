# Preval test case

# base_bit_set_32.md

> Bit hacks > Bit set > Base bit set 32
>
> Specific pattern of checking if a bit is set

#TODO

## Input

`````js filename=intro
const v = $(32);
const and = v & 64;
const set = and === 64;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const v = $(32);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized

`````js filename=intro
const v = $(32);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const v = $(32);
const and = v & 64;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 32
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
