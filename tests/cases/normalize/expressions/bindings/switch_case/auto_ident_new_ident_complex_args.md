# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Bindings > Switch case > Auto ident new ident complex args
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new $($(1), $(2));
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpClusterSSA_a /*:object*/ = new $(tmpCalleeParam, tmpCalleeParam$1);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(new $(tmpCalleeParam, tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
