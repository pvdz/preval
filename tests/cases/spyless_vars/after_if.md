# Preval test case

# after_if.md

> Spyless vars > After if
>
> A non-spying var decl in a single scope should be moved inside the thing that uses it

## Input

`````js filename=intro
const a = +$('1');
const x = a * 2; // Preval will know `a` is a number of sorts. Not a spy.
if ($) {
  $('foo');
}
// <-- The var decl should be moved here
$(x);
`````

## Pre Normal


`````js filename=intro
const a = +$(`1`);
const x = a * 2;
if ($) {
  $(`foo`);
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
} else {
}
$(x);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(`1`);
const a /*:number*/ = +tmpUnaryArg;
if ($) {
  $(`foo`);
} else {
}
const x /*:number*/ = a * 2;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "1" );
const b = +a;
if ($) {
  $( "foo" );
}
const c = b * 2;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1'
 - 2: 'foo'
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
