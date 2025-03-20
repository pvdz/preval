# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = (1, 2, b)[$("c")];
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const a /*:unknown*/ = b[tmpCompProp];
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
$(b[tmpCompProp], b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
