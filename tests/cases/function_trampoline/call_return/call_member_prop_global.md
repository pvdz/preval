# Preval test case

# call_member_prop_global.md

> Function trampoline > Call return > Call member prop global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f =  function() {
  const r = obj.$(1);
  return r;
};
const q = f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
$(q);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = { $: $ };
const q /*:unknown*/ = obj.$(1);
$(q);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ $: $ }.$(1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````


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
