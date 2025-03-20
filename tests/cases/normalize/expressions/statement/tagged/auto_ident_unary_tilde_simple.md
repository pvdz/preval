# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident unary tilde simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${~arg} after`;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, -2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], -2);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, -2 );
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], -2
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
