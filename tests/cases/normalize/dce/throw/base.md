# Preval test case

# base.md

> Normalize > Dce > Throw > Base
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  throw $(5, 'ret');
  $('fail');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  throw $(5, `ret`);
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpThrowArg = $(5, `ret`);
  throw tmpThrowArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(5, `ret`);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 5, "ret" );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5, 'ret'
 - eval returned: ('<crash[ 5 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
