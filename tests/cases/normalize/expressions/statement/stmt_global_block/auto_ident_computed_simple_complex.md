# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  b[$("c")];
  $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
$coerce(tmpCompProp, `string`);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(`c`), `string`);
$({ a: 999, b: 1000 }, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
$coerce( a, "string" );
const b = {
  a: 999,
  b: 1000,
};
const c = { c: 1 };
$( b, c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
