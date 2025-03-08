# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Tagged > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = "foo")} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, `foo`);
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], `foo`);
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = `foo`;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, "foo" );
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
