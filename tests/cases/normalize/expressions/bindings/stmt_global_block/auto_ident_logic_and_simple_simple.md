# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = 1 && 2;
  $(a);
}
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
{
  let a = 1 && 2;
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = 1;
if (a) {
  a = 2;
  $(a);
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
