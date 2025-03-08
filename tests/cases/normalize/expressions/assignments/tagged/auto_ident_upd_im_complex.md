# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = $($(b)).x--)} after`;
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$3 /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpUpdNum);
$(tmpUpdNum, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum - 1;
$([`before `, ` after`], tmpUpdNum);
$(tmpUpdNum, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $($(b)).x--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(b);
let tmpUpdObj = $(tmpCalleeParam$3);
let tmpUpdProp = tmpUpdObj.x;
let tmpUpdNum = $coerce(tmpUpdProp, `number`);
let tmpUpdInc = tmpUpdNum - 1;
tmpUpdObj.x = tmpUpdInc;
a = tmpUpdNum;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e - 1;
c.x = f;
const g = [ "before ", " after" ];
$( g, e );
$( e, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: ['before ', ' after'], 1
 - 4: 1, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
