# Preval test case

# call_member_dyn_closure.md

> Function trampoline > Call only > Call member dyn closure
>
> A trampoline is a function that just calls another function, and maybe returns its return value

## Input

`````js filename=intro
const obj = {$};
const f = function() {
  const str = '$';
  const h = function(){
    obj[str](1);
  };
  h(); // In this test, this is the call we expect to be replaced by trampoline inlining...
};
f();
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { $: $ };
$dotCall($, obj, undefined, 1);
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
const obj = { $: $ };
const f = function () {
  debugger;
  const str = `\$`;
  const h = function () {
    debugger;
    const tmpMCF = obj[str];
    $dotCall(tmpMCF, obj, undefined, 1);
    return undefined;
  };
  h();
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
