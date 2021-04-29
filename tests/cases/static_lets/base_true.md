# Preval test case

# base_true.md

> Static lets > Base true
>
> If the read of a value of a `let` binding can be determined then we should inline it.

#TODO

## Input

`````js filename=intro
let x = 5;
$(x);
if ($(true)) {
  x = 10;
  $(x, 'a'); // Note: $ gets invoked _after_ reading x so it should not block the inline
} else {
  x = 20;
  $(x, 'b');
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 5;
$(x);
if ($(true)) {
  x = 10;
  $(x, 'a');
} else {
  x = 20;
  $(x, 'b');
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 5;
$(x);
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 10;
  $(x, 'a');
} else {
  x = 20;
  $(x, 'b');
}
$(x);
`````

## Output

`````js filename=intro
let x = 5;
$(5);
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 10;
  $(10, 'a');
} else {
  x = 20;
  $(20, 'b');
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: true
 - 3: 10, 'a'
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same