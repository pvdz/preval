# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Template > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${b}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
$(`before  1  after`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  1  after`);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before  1  after" );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before 1 after'
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
