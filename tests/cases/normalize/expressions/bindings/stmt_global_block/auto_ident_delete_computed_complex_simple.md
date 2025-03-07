# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident delete computed complex simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = delete $(arg)["y"];
  $(a, arg);
}
`````

## Settled


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const a /*:boolean*/ = delete tmpDeleteObj.y;
$(a, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
$(delete tmpDeleteObj.y, arg);
`````

## Pre Normal


`````js filename=intro
{
  let arg = { y: 1 };
  let a = delete $(arg)[`y`];
  $(a, arg);
}
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( c, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
