# Preval test case

# return_var_arguments.md

> Function inlining > Return var arguments
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

## Input

`````js filename=intro
function f(a) {
  const x = arguments;
  function g() {
    const y = x;
    return y;
  }
  return g();
}
$(f());
`````


## Settled


`````js filename=intro
const f /*:(unused)=>arguments*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam /*:arguments*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  return tmpPrevalAliasArgumentsAny;
};
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  return b;
};
const d = a();
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
