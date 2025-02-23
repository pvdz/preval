# Preval test case

# func_group_call.md

> Normalize > Call > Func group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $(parseInt))()
  return $(y);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const y = (1, 2, $(parseInt))();
  return $(y);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCallComplexCallee = $(parseInt);
  const y = tmpCallComplexCallee();
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $(parseInt);
const y /*:unknown*/ = tmpCallComplexCallee();
const tmpReturnArg /*:unknown*/ = $(y);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( parseInt );
const b = a();
const c = $( b );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
