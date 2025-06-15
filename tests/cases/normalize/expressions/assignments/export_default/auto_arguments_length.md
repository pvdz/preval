# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Export default > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = arguments;
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
export { a as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
export { a as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
export { a as default };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
