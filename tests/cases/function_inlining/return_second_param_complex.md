# Preval test case

# return_second_param_complex.md

> Function inlining > Return second param complex
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f(a, b) {
  return b;
}
$(f($(10), $(20)));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
$(f($(10), $(20)));
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$3 = $(20);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(10);
const tmpCalleeParam$3 = $(20);
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
const a = $( 20 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
