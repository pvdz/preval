# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident computed simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = b[$("c")];
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const a /*:unknown*/ = b[tmpCalleeParam];
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`c`);
const b = { c: 1 };
$(b[tmpCalleeParam], b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( c, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
