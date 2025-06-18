# Preval test case

# includes_as_statement_unknown.md

> Type tracked > String method > Includes as statement unknown

## Options

- globals: a b c x

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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $coerce(x, `string`);
const tmpMCF = str.includes;
$dotCall(tmpMCF, str, `includes`, a, b, c);
let tmpCalleeParam = str.length;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None (except for the 4 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
