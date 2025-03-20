# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt call simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $?.(1);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
  $(undefined);
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  $(tmpChainElementCall);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($ == null) {
  $(undefined);
} else {
  $($(1));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $ == null;
if (a) {
  $( undefined );
}
else {
  const b = $( 1 );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
