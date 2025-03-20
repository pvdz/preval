# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || 2) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpObjSpreadArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  tmpObjSpreadArg = 2;
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpObjSpreadArg = $($(0));
if (!tmpObjSpreadArg) {
  tmpObjSpreadArg = 2;
}
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = 2;
}
{ ... b };
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
