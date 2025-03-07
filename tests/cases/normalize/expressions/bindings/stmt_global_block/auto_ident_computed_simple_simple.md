# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = { c: 1 };

  let a = b["c"];
  $(a, b);
}
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { c: 1 });
`````

## Pre Normal


`````js filename=intro
{
  let b = { c: 1 };
  let a = b[`c`];
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = b.c;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
