# Preval test case

# computed_no_no_no.md

> Normalize > Optional > Computed no no no
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b][c][d]);
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: { d: 10 } } };
const b = `b`,
  c = `c`,
  d = `d`;
$(a[b][c][d]);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const b = `b`;
const c = `c`;
const d = `d`;
const tmpCompObj$1 = a[b];
const tmpCompObj = tmpCompObj$1[c];
const tmpCalleeParam = tmpCompObj[d];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
