# Preval test case

# block2.md

> Normalize > Dce > Throw > Block2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  {
    throw $(1, 'throw');
    $('fail');
  }
  $('fail');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    throw $(1, `throw`);
    $(`fail`);
  }
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpThrowArg = $(1, `throw`);
  throw tmpThrowArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpThrowArg /*:unknown*/ = $(1, `throw`);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "throw" );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
