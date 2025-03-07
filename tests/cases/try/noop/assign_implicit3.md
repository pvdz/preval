# Preval test case

# assign_implicit3.md

> Try > Noop > Assign implicit3
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
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = 100;
  try {
    y = $;
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
    y = $;
  } catch (e) {}
  return y;
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
