# Preval test case

# return_implicit2.md

> Try > Noop > Return implicit2
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return $;
  } catch {}
}
$(f(x));
`````

## Settled


`````js filename=intro
x;
$($);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$($);
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
const tmpCalleeParam = f(x);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
x;
$( $ );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
