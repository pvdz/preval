# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Func > Group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
function f() {
  ($(1), 2).foo;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$Number_prototype.foo;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$Number_prototype.foo;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$Number_prototype.foo;
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpCompObj = 2;
  tmpCompObj.foo;
  return undefined;
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
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
