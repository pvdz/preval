# Preval test case

# inside_cons_and_after.md

> Spyless vars > Inside cons and after
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it, unless it is used in more places

#TODO

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
  $(x);
}
$(x);
`````

## Pre Normal

`````js filename=intro
const a = +$(`1`);
const x = a * 2;
if ($) {
  $(`foo`);
  $(x);
}
$(x);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
const x = a * 2;
if ($) {
  $(`foo`);
  $(x);
} else {
}
$(x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(`1`);
const a = +tmpUnaryArg;
const x = a * 2;
if ($) {
  $(`foo`);
  $(x);
} else {
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "1" );
const b = +a;
const c = b * 2;
if ($) {
  $( "foo" );
  $( c );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: 'foo'
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
