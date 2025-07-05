# Preval test case

# func_middle.md

> Normalize > Sequence > Func middle
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
function f() {
  ($(1), $(2), ($(3), $(4)), $(5), $(6));
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
