# Preval test case

# conditional_true.md

> Static lets > Conditional true
>
> If the read of a value of a `let` binding can be determined then we should inline it.

#TODO

## Input

`````js filename=intro
let x = 5;
if ($(true)) {
  x = 10;
  const a = x;
  $(a, 'a');
} else {
  x = 20;
  const b = x;
  $(b, 'b');
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 5;
if ($(true)) {
  x = 10;
  const a = x;
  $(a, `a`);
} else {
  x = 20;
  const b = x;
  $(b, `b`);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 5;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 10;
  const a = x;
  $(a, `a`);
} else {
  x = 20;
  const b = x;
  $(b, `b`);
}
$(x);
`````

## Output

`````js filename=intro
let x = 0;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 10;
  $(10, `a`);
} else {
  x = 20;
  $(20, `b`);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 10, 'a'
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
