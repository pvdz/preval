# Preval test case

# base.md

> Try > Noop > Base
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return 100;
  } catch {}
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  try {
    return 100;
  } catch (e) {}
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  try {
    return 100;
  } catch (e) {}
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = 100;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  tmpCalleeParam = undefined;
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 100;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  }
  catch (b) {

  }
  a = undefined;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
