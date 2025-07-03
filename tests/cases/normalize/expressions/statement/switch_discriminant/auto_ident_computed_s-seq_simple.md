# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((1, 2, b)[$("c")]) {
  default:
    $(100);
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
$coerce(tmpCalleeParam, `string`);
$(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const b /*:object*/ /*truthy*/ = { c: 1 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String($(`c`));
$(100);
$({ a: 999, b: 1000 }, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
$coerce( a, "string" );
$( 100 );
const b = {
  a: 999,
  b: 1000,
};
const c = { c: 1 };
$( b, c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParam = $(`c`);
const tmpSwitchDisc = tmpCompObj[tmpCalleeParam];
$(100);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
