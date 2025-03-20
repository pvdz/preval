# Preval test case

# call_member_dyn_global.md

> Function trampoline > Call only > Call member dyn global
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const str = '$';
const f =  function() {
  obj[str](1);
};
f(); // In this test, this is the call we expect to be replaced by trampoline inlining...
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
