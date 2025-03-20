# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${[1, 2, 3]} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], [1, 2, 3]);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = [ 1, 2, 3 ];
$( a, b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  ['before ', ' after'],
  [1, 2, 3],

 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
