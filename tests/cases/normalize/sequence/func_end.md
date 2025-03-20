# Preval test case

# func_end.md

> Normalize > Sequence > Func end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
function f() {
  ($(1), $(2), $(3), $(4), ($(5), $(6)));
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
