# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond c-seq s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
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
let a = 60;
if (!$(30)) {
  a = $($(100));
}
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = (10, 20, $(30)) ? (40, 50, 60) : $($(100));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
export { a as a };
$( a );
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
