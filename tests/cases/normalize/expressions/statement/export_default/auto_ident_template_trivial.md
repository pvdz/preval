# Preval test case

# auto_ident_template_trivial.md

> Normalize > Expressions > Statement > Export default > Auto ident template trivial
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = `foo`;
$(a);
`````

## Settled


`````js filename=intro
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = `foo`;
$(a);
`````

## Normalized


`````js filename=intro
let a = `foo`;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
