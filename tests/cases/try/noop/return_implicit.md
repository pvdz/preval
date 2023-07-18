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
const f = function () {
  debugger;
  try {
    return xyz;
  } catch (e) {}
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  try {
    return xyz;
  }
catch (e) {

  }
  return undefined;
},;
const b = a();
$( b );
`````

## Globals

BAD@! Found 2 implicit global bindings:

xyz, e

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
