# Preval test case

# base.md

> Expandos > Functions > Base
>
> Basic expando stuff

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = 10;
$(f.foo);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
f.foo = 10;
$(f.foo);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f.foo = 10;
const tmpCallCallee = $;
const tmpCalleeParam = f.foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
