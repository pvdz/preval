# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw $($(b)).x++;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
throw tmpPostUpdArgVal;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPostUpdArgObj = $($({ x: 1 }));
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
tmpPostUpdArgObj.x = tmpPostUpdArgVal + 1;
throw tmpPostUpdArgVal;
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
throw $($(b)).x++;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpThrowArg = tmpPostUpdArgVal;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
throw d;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
