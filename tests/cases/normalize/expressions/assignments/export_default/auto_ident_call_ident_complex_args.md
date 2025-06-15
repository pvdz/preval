# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Export default > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
export default a = $($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
export { a as default };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1), $(2));
export { a as default };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
export { c as default };
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpCalleeParam$1 = $(2);
a = $(tmpCalleeParam, tmpCalleeParam$1);
const tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
