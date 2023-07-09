# Preval test case

# return_implicit2.md

> Try > Noop > Return implicit2
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f() {
  try {
    return $;
  } catch {}
}
$(f(x));
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
    return $;
  } catch (e) {}
};
$(f(x));
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    return $;
  } catch (e) {}
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(x);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
x;
$($);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
