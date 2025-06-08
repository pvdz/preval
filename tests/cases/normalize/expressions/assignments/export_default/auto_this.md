# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Export default > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = this;
$(a);
`````


## Settled


`````js filename=intro
const a /*:undefined*/ /*falsy*/ = undefined;
export { a as default };
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = undefined;
export { a as default };
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = undefined;
export { a as default };
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Todos triggered


- (todo) Exported members must have a local binding so this leads to failure but we could still inline other local occurrences


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
