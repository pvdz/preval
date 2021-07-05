# Preval test case

# bin_right_str.md

> If update var > Bin right str
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

The idea is that `x` will be replaced by `y` here.

#TODO

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = 'left' + x;
$(y);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = `left` + x;
$(y);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 100;
} else {
  x = 200;
}
const tmpStringConcatL = $coerce(x, `plustr`);
const y = `left${tmpStringConcatL}`;
$(y);
`````

## Output

`````js filename=intro
let x = 100;
const tmpIfTest = $(true);
if (tmpIfTest) {
} else {
  x = 200;
}
const tmpStringConcatL = $coerce(x, `string`);
const y = `left${tmpStringConcatL}`;
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'left100'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
