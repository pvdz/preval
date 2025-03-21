# Preval test case

# includes_as_statement_unknown.md

> Type tracked > String method > Includes as statement unknown

## Options

- globals: a b c

## Input

`````js filename=intro
const str = String(x);
str.includes(a, b, c);
$(str.length);
`````


## Settled


`````js filename=intro
const str /*:string*/ = $coerce(x, `string`);
$coerce(a, `string`);
$coerce(b, `number`);
c;
const tmpCalleeParam /*:number*/ = str.length;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $coerce(x, `string`);
$coerce(a, `string`);
$coerce(b, `number`);
c;
$(str.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const d = $coerce( x, "string" );
$coerce( a, "string" );
$coerce( b, "number" );
c;
const e = d.length;
$( e );
`````


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
