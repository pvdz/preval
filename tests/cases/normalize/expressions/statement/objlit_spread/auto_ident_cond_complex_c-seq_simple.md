# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($(1) ? (40, 50, $(60)) : $($(100))) });
$(a);
`````


## Settled


`````js filename=intro
let tmpObjSpreadArg /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  tmpObjSpreadArg = $(60);
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
if ($(1)) {
  tmpObjSpreadArg = $(60);
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
const b = $( 1 );
if (b) {
  a = $( 60 );
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
