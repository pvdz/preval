# Preval test case

# spread_call.md

> Normalize > Object > Spread call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
function f(){
  return $({x: 1});
}
$({...f()});
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $({ x: 1 });
};
$({ ...f() });
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 1 };
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpObjSpread = f();
const tmpCalleeParam$1 = { ...tmpObjSpread };
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { x: 1 };
const tmpReturnArg = $(tmpCalleeParam);
const tmpCalleeParam$1 = { ...tmpReturnArg };
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = { ... b };
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
