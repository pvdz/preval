# Preval test case

# return_closure_const.md

> Function > Return closure const
>
> Function that returns a closure

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline (because it returns a closure).

I'm happy to reach a point where it can inline the function properly though :D

## Input

`````js filename=intro
const x = 'x'; // this will probably be inlined easily
function f() {
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
const x = `x`;
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return x;
};
const x = `x`;
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`x`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "x" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
