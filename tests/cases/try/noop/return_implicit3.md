# Preval test case

# return_implicit3.md

> Try > Noop > Return implicit3
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
$(f(50));
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
    return $;
  } catch (e) {}
};
$(f(50));
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
const tmpCalleeParam = f(50);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$($);
`````

## PST Output

With rename=true

`````js filename=intro
$( $ );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
