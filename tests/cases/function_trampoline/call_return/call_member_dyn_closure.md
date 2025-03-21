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
