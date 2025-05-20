# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Template > Auto ident new computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${new (1, 2, b)["$"](1)}  after`);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = new $(1);
const tmpStringConcatL /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpStringConcatL}  after`;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  ${new $(1)}  after`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = $coerce( a, "string" );
const c = `before  ${b}  after`;
$( c );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'before [object Object] after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
