# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident upd pi simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = 1;

  let a = ++b;
  $(a, b);
}
`````

## Settled


`````js filename=intro
$(2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, 2);
`````

## Pre Normal


`````js filename=intro
{
  let b = 1;
  let a = ++b;
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = 1;
b = b + 1;
let a = b;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
