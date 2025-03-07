# Preval test case

# return_implicit3.md

> Try > Noop > Return implicit3
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return $;
  } catch {}
}
$(f(50));
`````

## Settled


`````js filename=intro
$($);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
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
const tmpCalleeParam = f(50);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( $ );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
