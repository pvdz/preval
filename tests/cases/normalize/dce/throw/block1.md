# Preval test case

# block1.md

> Normalize > Dce > Throw > Block1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  {
    throw $(7, 'throw');
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
    throw $(7, `throw`);
  }
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpThrowArg = $(7, `throw`);
  throw tmpThrowArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpThrowArg = $(7, `throw`);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 7, "throw" );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
