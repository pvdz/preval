# Preval test case

# includes_as_statement_known.md

> Type tracked > String method > Includes as statement known

## Options

- globals: a b c

## Input

`````js filename=intro
const str = '123';
str.includes(a, b, c);
$(str.length);
`````


## Settled


`````js filename=intro
$coerce(a, `string`);
$coerce(b, `number`);
c;
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce(a, `string`);
$coerce(b, `number`);
c;
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$coerce( a, "string" );
$coerce( b, "number" );
c;
$( 3 );
`````


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
