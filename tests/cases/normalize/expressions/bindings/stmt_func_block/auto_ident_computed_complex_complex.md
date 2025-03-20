# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = $(b)[$("c")];
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpCompObj[tmpCompProp];
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
$(tmpCompObj[tmpCompProp], b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
