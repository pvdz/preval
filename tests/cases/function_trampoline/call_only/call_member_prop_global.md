# Preval test case

# call_member_prop_global.md

> Function trampoline > Call only > Call member prop global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f =  function() {
  obj.$(1);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { $: $ };
$dotCall($, obj, `\$`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($, { $: $ }, `\$`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
$dotCall( $, a, "$", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { $: $ };
const f = function () {
  debugger;
  const tmpMCF = obj.$;
  $dotCall(tmpMCF, obj, `\$`, 1);
  return undefined;
};
f();
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
