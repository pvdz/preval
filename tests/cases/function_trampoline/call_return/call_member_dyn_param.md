# Preval test case

# call_member_dyn_param.md

> Function trampoline > Call return > Call member dyn param
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function(obj, str) {
  const r = obj[str](1);
  return r;
};
const obj = {$};
const q = f(obj, '$'); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````


## Settled


`````js filename=intro
const obj$1 /*:object*/ /*truthy*/ = { $: $ };
const r /*:unknown*/ = $dotCall($, obj$1, undefined, 1);
$(r);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($, { $: $ }, undefined, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $dotCall( $, a, undefined, 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0, $$1) {
  let obj$1 = $$0;
  let str = $$1;
  debugger;
  const tmpMCF = obj$1[str];
  const r = $dotCall(tmpMCF, obj$1, undefined, 1);
  return r;
};
const obj = { $: $ };
const q = f(obj, `\$`);
$(q);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
