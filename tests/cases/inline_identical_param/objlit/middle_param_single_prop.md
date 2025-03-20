# Preval test case

# middle_param_single_prop.md

> Inline identical param > Objlit > Middle param single prop
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y, obj.a);
}

f('x', {a: 1}, 'y');
f('w', {a: 3}, 'z');
`````


## Settled


`````js filename=intro
$(`x`, `y`, 1);
$(`w`, `z`, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`, `y`, 1);
$(`w`, `z`, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x", "y", 1 );
$( "w", "z", 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 'y', 1
 - 2: 'w', 'z', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
