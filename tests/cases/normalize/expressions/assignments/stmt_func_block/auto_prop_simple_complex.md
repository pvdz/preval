# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a.b = $(2);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpAssignMemRhs };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = { b: a };
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
