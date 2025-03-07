# Preval test case

# return_var_param_no_args.md

> Function inlining > Return var param no args
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

## Input

`````js filename=intro
function f(a) {
  const x = a;
  return x;
}
$(f());
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a;
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
