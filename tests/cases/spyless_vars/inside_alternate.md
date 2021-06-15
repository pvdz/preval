# Preval test case

# inside_alternate.md

> Spyless vars > Inside alternate
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it

#TODO

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
} else {
  // <-- The var decl should be moved here
  $(x);
}
`````

## Pre Normal

`````js filename=intro
const a = +$(`1`);
const x = a * 2;
if ($) {
  $(`foo`);
} else {
  $(x);
}
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
const x = a * 2;
if ($) {
  $(`foo`);
} else {
  $(x);
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
if ($) {
  $(`foo`);
} else {
  const x = a * 2;
  $(x);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
