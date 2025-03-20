# Preval test case

# base_class.md

> Normalize > Export > Named > Base class
>
> Exporting declarations

## Input

`````js filename=intro
export class X {};
new X();
`````


## Settled


`````js filename=intro
const X /*:class*/ = class {};
export { X };
new X();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const X = class {};
export { X };
new X();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
export { a as X };
new a();
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
