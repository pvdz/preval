# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") || (a = "foo"));
$(a);
`````

## Settled


`````js filename=intro
$(`foo`);
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = `foo`) || (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  a = `foo`;
  tmpCalleeParam = `foo`;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
