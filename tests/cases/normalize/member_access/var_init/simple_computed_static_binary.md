# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Var init > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj['fo' + 'o'];
$(x);
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
const obj = { foo: 10 };
let x = obj[`fo` + `o`];
$(x);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = `foo`;
let x = tmpCompObj[tmpCompProp];
$(x);
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
