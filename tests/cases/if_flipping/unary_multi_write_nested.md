# Preval test case

# unary_multi_write_nested.md

> If flipping > Unary multi write nested
>
> When the binding is used in multiple `if`s

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) { // This should become x, with the branches flipped
  $('if1');
} else {
  y = !b; // This will get SSA'd and the SSA'd var gets flipped and eliminated
  if (y) {
    $('if2');
  } else {
    $('else1');
  }
}

//$(y, 'after');
`````

## Pre Normal

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) {
  $(`if1`);
} else {
  y = !b;
  if (y) {
    $(`if2`);
  } else {
    $(`else1`);
  }
}
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) {
  $(`if1`);
} else {
  y = !b;
  if (y) {
    $(`if2`);
  } else {
    $(`else1`);
  }
}
`````

## Output

`````js filename=intro
const a = $(1);
const b = $(2);
if (a) {
  if (b) {
    $(`else1`);
  } else {
    $(`if2`);
  }
} else {
  $(`if1`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'else1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
