# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = 0 || $($(1));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
$(tmpClusterSSA_a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(1)));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
