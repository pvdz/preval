# Preval test case

# assign_implicit.md

> Try > Noop > Assign implicit
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f(x) {
  let y = 100;
  try {
    y = xyz;
  } catch {}
  return y;
}
$(f(50));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = xyz;
  } catch (e) {}
  return y;
};
$(f(50));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = xyz;
  } catch (e) {}
  return y;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(50);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let y = 100;
try {
  y = xyz;
} catch (e) {}
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 100;
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
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
