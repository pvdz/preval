# Preval test case

# return_ident2.md

> Try > Noop > Return ident2
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f(x) {
  try {
    return x;
  } catch {}
}
$(f(x));
`````

## Settled


`````js filename=intro
const x$1 /*:unknown*/ = x;
$(x$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(x);
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
const tmpCalleeParam = f(x);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = x;
$( a );
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
