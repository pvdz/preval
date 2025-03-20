# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident delete computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let arg = { y: 1 };

    let a = delete arg[$("y")];
    $(a, arg);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpClusterSSA_arg /*:object*/ = { y: 1 };
const tmpClusterSSA_a /*:boolean*/ = delete tmpClusterSSA_arg[tmpDeleteCompProp];
$(tmpClusterSSA_a, tmpClusterSSA_arg);
$(`fail1`);
$(`fail2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpDeleteCompProp = $(`y`);
const tmpClusterSSA_arg = { y: 1 };
$(delete tmpClusterSSA_arg[tmpDeleteCompProp], tmpClusterSSA_arg);
$(`fail1`);
$(`fail2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( c, b );
$( "fail1" );
$( "fail2" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
