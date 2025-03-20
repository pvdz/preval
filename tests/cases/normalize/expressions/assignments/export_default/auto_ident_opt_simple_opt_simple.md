# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
export default a = b?.x?.y;
$(a);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 1;
export { a as default };
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
export { a as default };
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as default };
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
