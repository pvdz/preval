# Preval test case

# base.md

> Static lets > Base
>
> If the read of a value of a `let` binding can be determined then we should inline it.

#TODO

## Input

`````js filename=intro
let x = 5;
$(x);
if ($) {
  x = 10;
  $(x, 'a');
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
if ($) {
  x = 10;
  $(x, `a`);
} else {
  x = 20;
  $(x, `b`);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = 5;
$(x);
if ($) {
  x = 10;
  $(x, `a`);
} else {
  x = 20;
  $(x, `b`);
}
$(x);
`````

## Output

`````js filename=intro
let x = 5;
$(5);
if ($) {
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
 - 1: 5
 - 2: 10, 'a'
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
