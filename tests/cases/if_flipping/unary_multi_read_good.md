# Preval test case

# unary_multi_read_good.md

> If flipping > Unary multi read good
>
> When the binding is used in multiple `if`s

#TODO

## Input

`````js filename=intro
const x = $(1);
const y = !x;
if (y) { // This should become x, with the branches flipped
  $('if1');
} else {
  $('else1');
}

if (y) { // This should also become x, with the branches flipped
  $('if2');
} else {
  $('else2');
}
`````

## Pre Normal

`````js filename=intro
const x = $(1);
const y = !x;
if (y) {
  $(`if1`);
} else {
  $(`else1`);
}
if (y) {
  $(`if2`);
} else {
  $(`else2`);
}
`````

## Normalized

`````js filename=intro
const x = $(1);
const y = !x;
if (y) {
  $(`if1`);
} else {
  $(`else1`);
}
if (y) {
  $(`if2`);
} else {
  $(`else2`);
}
`````

## Output

`````js filename=intro
const x = $(1);
if (x) {
  $(`else1`);
  $(`else2`);
} else {
  $(`if1`);
  $(`if2`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'else1'
 - 3: 'else2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
