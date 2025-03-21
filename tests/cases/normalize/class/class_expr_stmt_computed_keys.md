# Preval test case

# class_expr_stmt_computed_keys.md

> Normalize > Class > Class expr stmt computed keys
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

## Input

`````js filename=intro
(class x {
  [$('a')](){}
  [$('b')](){}
});
`````


## Settled


`````js filename=intro
$(`a`);
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "b" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
