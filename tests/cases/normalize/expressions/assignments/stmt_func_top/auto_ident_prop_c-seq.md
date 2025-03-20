# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  a = (1, 2, $(b)).c;
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
$(tmpClusterSSA_a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
$($(b).c, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
$( c, a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
