# Preval test case

# base_falsy.md

> Type tracked > If > Base falsy
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

#TODO

## Input

`````js filename=intro
const x = 1 * $(1); // "we know x is a number but not what kind of number"
if (x) {
  // x can not be 0 or -0 or NaN
  $(x, 'fail1');
} else {
  // x is 0 or -0 or NaN
  if (x) {
    $(x, 'fail2');
  } else {
    $(x, 'pass');
  }
}
`````

## Pre Normal

`````js filename=intro
const x = 1 * $(1);
if (x) {
  $(x, 'fail1');
} else {
  if (x) {
    $(x, 'fail2');
  } else {
    $(x, 'pass');
  }
}
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
if (x) {
  $(x, 'fail1');
} else {
  $(x, 'pass');
}
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
if (x) {
  $(x, 'fail1');
} else {
  $(x, 'pass');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'fail1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
