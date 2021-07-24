# Preval test case

# base_let_then.md

> If merging > Base let then
>
> When back to back ifs test on the same constant, the ifs can be merged safely

#TODO

## Input

`````js filename=intro
let x 
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) {
  $('a');
  x = 10; // Blocks the merge
} else {
  $('b');
}
if (x) $('d'); else $('c');
`````

## Pre Normal

`````js filename=intro
let x;
if ($(true)) {
  x = !$(true);
} else {
  x = !$(false);
}
if (x) {
  $(`a`);
  x = 10;
} else {
  $(`b`);
}
if (x) $(`d`);
else $(`c`);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpUnaryArg = $(true);
  x = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 = $(false);
  x = !tmpUnaryArg$1;
}
if (x) {
  $(`a`);
  x = 10;
} else {
  $(`b`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output

`````js filename=intro
let x = 0;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpUnaryArg = $(true);
  x = !tmpUnaryArg;
} else {
  const tmpUnaryArg$1 = $(false);
  x = !tmpUnaryArg$1;
}
if (x) {
  $(`a`);
  $(`d`);
} else {
  $(`b`);
  $(`c`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'b'
 - 4: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
