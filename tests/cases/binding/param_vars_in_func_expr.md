# Preval test case

# param_vars_in_func_expr.md

> Binding > Param vars in func expr
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
const f = function(a) {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
const b /*:unknown*/ = $(20);
const tmpReturnArg /*:array*/ = [a, b];
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10);
const b = $(20);
$([a, b]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ a, b ];
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
