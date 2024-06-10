# Preval test case

# return_ident.md

> Try > Noop > Return ident
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f(x) {
  try {
    return x;
  } catch {}
}
$(f(50));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  try {
    return x;
  } catch (e) {}
};
$(f(50));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  try {
    return x;
  } catch (e) {}
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(50);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = 50;
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
let a = 50;
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
 - 1: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
