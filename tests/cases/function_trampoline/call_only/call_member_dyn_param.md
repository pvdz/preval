# Preval test case

# call_member_dyn_param.md

> Function trampoline > Call only > Call member dyn param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(obj, str) {
  obj[str](1);
};
const obj = {$};
f(obj, '$'); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````


## Settled


`````js filename=intro
const obj$1 /*:object*/ /*truthy*/ = { $: $ };
$dotCall($, obj$1, undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($, { $: $ }, undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
$dotCall( $, a, undefined, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1) {
  let obj$1 = $$0;
  let str = $$1;
  debugger;
  const tmpMCF = obj$1[str];
  $dotCall(tmpMCF, obj$1, undefined, 1);
  return undefined;
};
const obj = { $: $ };
f(obj, `\$`);
`````


## Todos triggered


None


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
