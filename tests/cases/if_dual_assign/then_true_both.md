# Preval test case

# then_true_both.md

> If dual assign > Then true both
>
> This case should make sure we don't accidentally set a var to a value it should not be having

#TODO

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('x', 'one');
const a = b === c;
if (a) {
  x = true; // Can be eliminated. Should not cause x to be set to a.
} else {
}
$(x, 'middle');
if (a) {
  x = true;
} else {
  x = false;
}
$(x, 'end');
`````

## Pre Normal

`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`x`, `one`);
const a = b === c;
if (a) {
  x = true;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## Normalized

`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`x`, `one`);
const a = b === c;
if (a) {
  x = true;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## Output

`````js filename=intro
const b = $(`x`, `one`);
const c = $(`x`, `one`);
const a = b === c;
if (a) {
  $(true, `middle`);
} else {
  $(false, `middle`);
}
if (a) {
  $(true, `end`);
} else {
  $(false, `end`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x', 'one'
 - 2: 'x', 'one'
 - 3: true, 'middle'
 - 4: true, 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
