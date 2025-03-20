# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = b[$("$")](1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const tmpClusterSSA_b /*:object*/ = { $: $ };
const tmpClusterSSA_a /*:unknown*/ = tmpClusterSSA_b[tmpCallCompProp](1);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
$({ $: $ }[tmpCallCompProp](1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
