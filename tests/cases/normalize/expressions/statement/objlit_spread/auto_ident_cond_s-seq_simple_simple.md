# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...((10, 20, 30) ? $(2) : $($(100))) });
$(a);
`````

## Settled


`````js filename=intro
const tmpObjSpreadArg /*:unknown*/ = $(2);
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = $(2);
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...((10, 20, 30) ? $(2) : $($(100))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpObjSpreadArg = $(2);
} else {
  const tmpCalleeParam = $(100);
  tmpObjSpreadArg = $(tmpCalleeParam);
}
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
{ ... a };
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
