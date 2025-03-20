# Preval test case

# decl_escape_caught_upd.md

> Obj mutation > Decl escape caught upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
function f(a) {
  blob.thing = 'boom';
}
const blob = {thing: 'woop'};
f(blob);
blob.thing = 'boing';
$(blob);
`````


## Settled


`````js filename=intro
const blob /*:object*/ = { thing: `boing` };
$(blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ thing: `boing` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "boing" };
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
