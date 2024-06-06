# Preval test case

# return_one_param.md

> Function inlining > Return one param
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f(10));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
$(f(10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(10);
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
