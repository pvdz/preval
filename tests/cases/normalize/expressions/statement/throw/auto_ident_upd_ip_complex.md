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
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
throw tmpUpdNum;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($({ x: 1 }));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
throw tmpUpdNum;
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
let tmpUpdObj = $(tmpCalleeParam);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const tmpThrowArg = tmpUpdNum;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
throw e;
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
