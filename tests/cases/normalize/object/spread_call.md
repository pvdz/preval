# Preval test case

# spread_call.md

> normalize > object > spread_call
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

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 1 };
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpObjSpread = f();
const tmpCalleeParam$1 = { ...tmpObjSpread };
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 1 };
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpObjSpread = f();
const tmpCalleeParam$1 = { ...tmpObjSpread };
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
