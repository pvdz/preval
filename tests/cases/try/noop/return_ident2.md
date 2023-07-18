# Preval test case

# return_ident2.md

> Try > Noop > Return ident2
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
$(f(x));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x$1 = $$0;
  debugger;
  try {
    return x$1;
  } catch (e) {}
};
$(f(x));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x$1 = $$0;
  debugger;
  try {
    return x$1;
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
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x;
$( x );
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
