# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  (1, 2, b)[$("c")];
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
b[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
b[tmpCompProp];
$({ a: 999, b: 1000 }, b);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
b[ a ];
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
