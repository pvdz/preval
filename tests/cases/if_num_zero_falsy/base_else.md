# Preval test case

# base_else.md

> If num zero falsy > Base else
>
> If an unknown value known to be a number is checked against zero, it is a falsy check, which may make things simpler for us.

#TODO

## Input

`````js filename=intro
const x = $(1);
const a = x & $(2);
const atest = a === 0; // This is the same as !atest
if (atest) $('a');
else $('b');
`````

## Pre Normal

`````js filename=intro
const x = $(1);
const a = x & $(2);
const atest = a === 0;
if (atest) $(`a`);
else $(`b`);
`````

## Normalized

`````js filename=intro
const x = $(1);
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs & tmpBinBothRhs;
const atest = a === 0;
if (atest) {
  $(`a`);
} else {
  $(`b`);
}
`````

## Output

`````js filename=intro
const x = $(1);
const tmpBinBothRhs = $(2);
const a = x & tmpBinBothRhs;
if (a) {
  $(`b`);
} else {
  $(`a`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same