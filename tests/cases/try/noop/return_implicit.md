# Preval test case

# return_implicit.md

> Try > Noop > Return implicit
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f() {
  try {
    return xyz;
  } catch {}
}
$(f(50));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  try {
    return xyz;
  } catch (e) {}
};
$(f(50));
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  try {
    return xyz;
  } catch (e) {}
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(50);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
try {
  tmpCalleeParam = xyz;
} catch (e) {}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
try {
  a = xyz;
}
catch (b) {

}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

xyz

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
