# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond complex c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = $(1) ? (40, 50, $(60)) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
}
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(1)) {
  a = $(60);
} else {
  a = $($(100));
}
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
export { a as a };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
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
