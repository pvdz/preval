# Preval test case

# base_bit_set_65.md

> Bit hacks > Bit set > Base bit set 65
>
> Specific pattern of checking if a bit is set

#TODO

## Input

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 64;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````

## Pre Normal

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const v = $(65);
const and = v & 64;
if (and) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 65
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
