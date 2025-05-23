# Preval test case

# return_string.md

> Function > Return string
>
> A function that returns a string

For this kind of case you would have to track that;
- The function always returns the same primitive
- The function was being called
- Optionally, in order to eliminate it; the function had no side effects ("pure") because who cares about a function with no side effects that always returns the same value.
- Intentional crashes notwithstanding. But why.

So the return analysis currently applied would have to be turned up to also include some analysis of side effects. This can be updates to closures, calls to functions with side effects, or black holes like accessing properties on unknown things.

The side effect analysis will be limited too. But who knows, it may be useful. In this case I guess it would have to be by process of opt-out; a function is considered to be pure until we find something that violates that.

## Input

`````js filename=intro
function f() {
  return "foo";
}
$(f());
`````


## Settled


`````js filename=intro
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return `foo`;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
