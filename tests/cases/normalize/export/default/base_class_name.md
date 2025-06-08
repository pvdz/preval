# Preval test case

# base_class_name.md

> Normalize > Export > Default > Base class name
>
> Exporting a class

## Input

`````js filename=intro
export default class X {};
new X();
`````


## Settled


`````js filename=intro
const X /*:class*/ /*truthy*/ = class {};
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let X = class {};
export { X };
new X();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
