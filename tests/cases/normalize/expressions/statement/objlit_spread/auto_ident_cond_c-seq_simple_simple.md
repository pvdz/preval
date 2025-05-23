# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...((10, 20, $(30)) ? $(2) : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
let tmpObjSpreadArg /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  tmpObjSpreadArg = $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpObjSpreadArg = $(tmpCalleeParam);
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpObjSpreadArg = undefined;
if ($(30)) {
  tmpObjSpreadArg = $(2);
} else {
  tmpObjSpreadArg = $($(100));
}
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
{ ... a };
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
