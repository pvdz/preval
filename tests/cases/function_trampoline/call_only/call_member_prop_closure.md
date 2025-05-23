# Preval test case

# call_member_prop_closure.md

> Function trampoline > Call only > Call member prop closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const f = function() {
  const obj = {$};
  const h = function(){
    obj.$(1);
  };
  h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
};
f();
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { $: $ };
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
