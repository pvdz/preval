# Preval test case

# with_ident_non_reachable.md

> Object literal > Inlining > With ident non reachable
>
>

## Input

`````js filename=intro
let g = /regex/;
const obj = {f: g};
$(obj.f);
`````

## Settled


`````js filename=intro
const g /*:regex*/ = /regex/;
$(g);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/regex/);
`````

## Pre Normal


`````js filename=intro
let g = /regex/;
const obj = { f: g };
$(obj.f);
`````

## Normalized


`````js filename=intro
let g = /regex/;
const obj = { f: g };
const tmpCalleeParam = obj.f;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = /regex/;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
