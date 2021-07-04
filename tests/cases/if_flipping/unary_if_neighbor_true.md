# Preval test case

# unary_if_neighbor_true.md

> If flipping > Unary if neighbor true
>
> When the binding is used in multiple `if`s

#TODO

## Input

`````js filename=intro
const a = $(true);
const b = $('alt');
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Pre Normal

`````js filename=intro
const a = $(true);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Normalized

`````js filename=intro
const a = $(true);
const b = $(`alt`);
let test = !a;
if (test) {
  test = b;
} else {
}
$(test);
`````

## Output

`````js filename=intro
const a = $(true);
const b = $(`alt`);
if (a) {
  $(false);
} else {
  $(b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'alt'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
