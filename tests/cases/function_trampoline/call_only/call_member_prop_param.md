# Preval test case

# call_member_prop_param.md

> Function trampoline > Call only > Call member prop param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(obj) {
  obj.$(1);
};
const obj = {$};
f(obj); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````

## Settled


`````js filename=intro
const obj /*:object*/ = { $: $ };
obj.$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
({ $: $ }.$(1));
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let obj$1 = $$0;
  debugger;
  obj$1.$(1);
};
const obj = { $: $ };
f(obj);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let obj$1 = $$0;
  debugger;
  obj$1.$(1);
  return undefined;
};
const obj = { $: $ };
f(obj);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
a.$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
