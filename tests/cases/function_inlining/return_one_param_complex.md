# Preval test case

# return_one_param_complex.md

> Function inlining > Return one param complex
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f($(10)));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
$(f($(10)));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(10);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
