# Preval test case

# call_member_dyn_closure.md

> Function trampoline > Call return > Call member dyn closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f = function() {
  const str = '$';
  const h = function(){
    const r = obj[str](1);
    return r;
  };
  const q = h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
  $(q);
};
f();
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { $: $ };
const r /*:unknown*/ = $dotCall($, obj, undefined, 1);
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
const obj = { $: $ };
const f = function () {
  debugger;
  const str = `\$`;
  const h = function () {
    debugger;
    const tmpMCF = obj[str];
    const r = $dotCall(tmpMCF, obj, undefined, 1);
    return r;
  };
  const q = h();
  $(q);
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
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
