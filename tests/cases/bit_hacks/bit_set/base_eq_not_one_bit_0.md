# Preval test case

# base_eq_not_one_bit_0.md

> Bit hacks > Bit set > Base eq not one bit 0
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

#TODO

## Input

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Pre Normal

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Normalized

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Output

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same