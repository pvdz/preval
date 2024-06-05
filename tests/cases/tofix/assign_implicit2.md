# Preval test case

# assign_implicit2.md

> Tofix > Assign implicit2
>
> Certain statements probably never benefit from running inside a try
> But the output `$($)` is incorrect as the reference would be caught and y remains 100

#TODO

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
const tmpCallCallee = $;
const tmpCalleeParam = f(x);
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
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: '<$>'
 - eval returned: undefined
