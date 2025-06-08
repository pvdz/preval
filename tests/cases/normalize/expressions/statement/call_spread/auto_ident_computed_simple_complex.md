# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...b[$("c")]);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 1 };
const tmpCalleeParamSpread /*:unknown*/ = b[tmpCalleeParam];
$(...tmpCalleeParamSpread);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(`c`);
const b = { c: 1 };
const tmpCalleeParamSpread = b[tmpCalleeParam];
$(...tmpCalleeParamSpread);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
$( ...c );
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParam = $(`c`);
let tmpCalleeParamSpread = tmpCompObj[tmpCalleeParam];
$(...tmpCalleeParamSpread);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
