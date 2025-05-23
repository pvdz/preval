# Preval test case

# arg_as_method_arg2.md

> Static arg ops > Arg as method arg2
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
const f = function(aa) {
  const a = aa;
  return "foo".slice(a);
};
f(`0`);
const t = f(`1`);
$(t);
`````


## Settled


`````js filename=intro
$(`oo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`oo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "oo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let aa = $$0;
  debugger;
  const a = aa;
  const tmpMCF = $string_slice;
  const tmpReturnArg = $dotCall($string_slice, `foo`, `slice`, a);
  return tmpReturnArg;
};
f(`0`);
const t = f(`1`);
$(t);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
