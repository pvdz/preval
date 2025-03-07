# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond complex simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = $(1) ? 2 : $($(100));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
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
let a = 2;
if (!$(1)) {
  a = $($(100));
}
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(1) ? 2 : $($(100));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
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
let a = 2;
const b = $( 1 );
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
