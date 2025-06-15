# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond s-seq c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = (10, 20, 30) ? (40, 50, $(60)) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(60);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
export { a as a };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(60);
} else {
  let tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
export { a };
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
