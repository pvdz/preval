# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident delete computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = delete arg[$("y")];
  $(a, arg);
}
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
$(delete arg[tmpDeleteCompProp], arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( c, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
