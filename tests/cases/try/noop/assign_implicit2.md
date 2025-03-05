# Preval test case

# assign_implicit2.md

> Try > Noop > Assign implicit2
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = $;
  } catch {}
  return y;
}
$(f(x));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = 100;
  try {
    y = $;
  } catch (e) {}
  return y;
};
$(f(x));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = 100;
  try {
    y = $;
  } catch (e) {}
  return y;
};
const tmpCalleeParam = f(x);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
x;
$($);
`````

## PST Output

With rename=true

`````js filename=intro
x;
$( $ );
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
