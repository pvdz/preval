# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Template > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${typeof $(x)}  after`);
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:string*/ = typeof tmpUnaryArg;
const tmpCalleeParam /*:string*/ = `before  ${tmpCalleeParam$1}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpCalleeParam$1 = typeof tmpUnaryArg;
$(`before  ${tmpCalleeParam$1}  after`);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
const c = `before  ${b}  after`;
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before number after'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
