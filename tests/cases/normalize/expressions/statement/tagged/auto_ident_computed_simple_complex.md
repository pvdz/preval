# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${b[$("c")]} after`;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpCalleeParam$1 /*:unknown*/ = b[tmpCalleeParam$3];
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$3 = $(`c`);
const b = { c: 1 };
const tmpCalleeParam$1 = b[tmpCalleeParam$3];
$([`before `, ` after`], tmpCalleeParam$1);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
const d = [ "before ", " after" ];
$( d, c );
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpCompObj = b;
const tmpCalleeParam$3 = $(`c`);
let tmpCalleeParam$1 = tmpCompObj[tmpCalleeParam$3];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
