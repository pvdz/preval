# Preval test case

# return_lit_thrice.md

> Function inlining > Return lit thrice
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
$(f());
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(10);
$(10);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
$( 10 );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
