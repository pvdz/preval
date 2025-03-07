# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident computed complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = $(b)[$("c")];
  $(a, b);
}
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpCompObj[tmpCompProp];
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
$(tmpCompObj[tmpCompProp], b);
`````

## Pre Normal


`````js filename=intro
{
  let b = { c: 1 };
  let a = $(b)[$(`c`)];
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
let a = tmpCompObj[tmpCompProp];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
