# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = typeof $(arg);
    $(a, arg);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
$(a, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(typeof tmpUnaryArg, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b, 1 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
