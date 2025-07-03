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
const tmpArgOverflow /*:unknown*/ = a;
const tmpArgOverflow$1 /*:unknown*/ = b;
c;
$coerce(tmpArgOverflow, `string`);
$coerce(tmpArgOverflow$1, `number`);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArgOverflow = a;
const tmpArgOverflow$1 = b;
c;
String(tmpArgOverflow);
Number(tmpArgOverflow$1);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
const d = a;
const e = b;
c;
$coerce( d, "string" );
$coerce( e, "number" );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = `123`;
const tmpMCF = str.includes;
$dotCall(tmpMCF, str, `includes`, a, b, c);
let tmpCalleeParam = str.length;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
