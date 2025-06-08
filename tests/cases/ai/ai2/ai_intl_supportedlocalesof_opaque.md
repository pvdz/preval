# Preval test case

# ai_intl_supportedlocalesof_opaque.md

> Ai > Ai2 > Ai intl supportedlocalesof opaque
>
> Test: Intl.*.supportedLocalesOf with opaque locales list and options.

## Input

`````js filename=intro
// Expected: Method preserved with opaque arguments.
let locales = $('slo_locales', ['en-GB', 'fr-CA', $('slo_opaque_locale', 'de-DE-u-co-phonebk')]);
let options = $('slo_options', { localeMatcher: $('slo_matcher', 'lookup') });

$('slo_dtf', Intl.DateTimeFormat.supportedLocalesOf(locales, options).length > 0);
$('slo_nf', Intl.NumberFormat.supportedLocalesOf(locales, options).length > 0);
$('slo_coll', Intl.Collator.supportedLocalesOf(locales, options).length > 0);
`````


## Settled


`````js filename=intro
const tmpArrElement$3 /*:unknown*/ = $(`slo_opaque_locale`, `de-DE-u-co-phonebk`);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`en-GB`, `fr-CA`, tmpArrElement$3];
const locales /*:unknown*/ = $(`slo_locales`, tmpCalleeParam);
const tmpObjLitVal /*:unknown*/ = $(`slo_matcher`, `lookup`);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { localeMatcher: tmpObjLitVal };
const options /*:unknown*/ = $(`slo_options`, tmpCalleeParam$1);
const tmpMCOO /*:unknown*/ = Intl.DateTimeFormat;
const tmpMCF /*:unknown*/ = tmpMCOO.supportedLocalesOf;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `supportedLocalesOf`, locales, options);
const tmpBinLhs /*:unknown*/ = tmpCompObj.length;
const tmpCalleeParam$3 /*:boolean*/ = tmpBinLhs > 0;
$(`slo_dtf`, tmpCalleeParam$3);
const tmpMCOO$1 /*:unknown*/ = Intl.NumberFormat;
const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.supportedLocalesOf;
const tmpCompObj$1 /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `supportedLocalesOf`, locales, options);
const tmpBinLhs$1 /*:unknown*/ = tmpCompObj$1.length;
const tmpCalleeParam$5 /*:boolean*/ = tmpBinLhs$1 > 0;
$(`slo_nf`, tmpCalleeParam$5);
const tmpMCOO$3 /*:unknown*/ = Intl.Collator;
const tmpMCF$3 /*:unknown*/ = tmpMCOO$3.supportedLocalesOf;
const tmpCompObj$3 /*:unknown*/ = $dotCall(tmpMCF$3, tmpMCOO$3, `supportedLocalesOf`, locales, options);
const tmpBinLhs$3 /*:unknown*/ = tmpCompObj$3.length;
const tmpCalleeParam$7 /*:boolean*/ = tmpBinLhs$3 > 0;
$(`slo_coll`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$3 = $(`slo_opaque_locale`, `de-DE-u-co-phonebk`);
const locales = $(`slo_locales`, [`en-GB`, `fr-CA`, tmpArrElement$3]);
const tmpObjLitVal = $(`slo_matcher`, `lookup`);
const options = $(`slo_options`, { localeMatcher: tmpObjLitVal });
const tmpMCOO = Intl.DateTimeFormat;
$(`slo_dtf`, tmpMCOO.supportedLocalesOf(locales, options).length > 0);
const tmpMCOO$1 = Intl.NumberFormat;
$(`slo_nf`, tmpMCOO$1.supportedLocalesOf(locales, options).length > 0);
const tmpMCOO$3 = Intl.Collator;
$(`slo_coll`, tmpMCOO$3.supportedLocalesOf(locales, options).length > 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "slo_opaque_locale", "de-DE-u-co-phonebk" );
const b = [ "en-GB", "fr-CA", a ];
const c = $( "slo_locales", b );
const d = $( "slo_matcher", "lookup" );
const e = { localeMatcher: d };
const f = $( "slo_options", e );
const g = Intl.DateTimeFormat;
const h = g.supportedLocalesOf;
const i = $dotCall( h, g, "supportedLocalesOf", c, f );
const j = i.length;
const k = j > 0;
$( "slo_dtf", k );
const l = Intl.NumberFormat;
const m = l.supportedLocalesOf;
const n = $dotCall( m, l, "supportedLocalesOf", c, f );
const o = n.length;
const p = o > 0;
$( "slo_nf", p );
const q = Intl.Collator;
const r = q.supportedLocalesOf;
const s = $dotCall( r, q, "supportedLocalesOf", c, f );
const t = s.length;
const u = t > 0;
$( "slo_coll", u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = `en-GB`;
const tmpArrElement$1 = `fr-CA`;
const tmpArrElement$3 = $(`slo_opaque_locale`, `de-DE-u-co-phonebk`);
let tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let locales = $(`slo_locales`, tmpCalleeParam);
const tmpObjLitVal = $(`slo_matcher`, `lookup`);
let tmpCalleeParam$1 = { localeMatcher: tmpObjLitVal };
let options = $(`slo_options`, tmpCalleeParam$1);
const tmpMCOO = Intl.DateTimeFormat;
const tmpMCF = tmpMCOO.supportedLocalesOf;
const tmpCompObj = $dotCall(tmpMCF, tmpMCOO, `supportedLocalesOf`, locales, options);
const tmpBinLhs = tmpCompObj.length;
let tmpCalleeParam$3 = tmpBinLhs > 0;
$(`slo_dtf`, tmpCalleeParam$3);
const tmpMCOO$1 = Intl.NumberFormat;
const tmpMCF$1 = tmpMCOO$1.supportedLocalesOf;
const tmpCompObj$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `supportedLocalesOf`, locales, options);
const tmpBinLhs$1 = tmpCompObj$1.length;
let tmpCalleeParam$5 = tmpBinLhs$1 > 0;
$(`slo_nf`, tmpCalleeParam$5);
const tmpMCOO$3 = Intl.Collator;
const tmpMCF$3 = tmpMCOO$3.supportedLocalesOf;
const tmpCompObj$3 = $dotCall(tmpMCF$3, tmpMCOO$3, `supportedLocalesOf`, locales, options);
const tmpBinLhs$3 = tmpCompObj$3.length;
let tmpCalleeParam$7 = tmpBinLhs$3 > 0;
$(`slo_coll`, tmpCalleeParam$7);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'slo_opaque_locale', 'de-DE-u-co-phonebk'
 - 2: 'slo_locales', ['en-GB', 'fr-CA', 'slo_opaque_locale']
 - 3: 'slo_matcher', 'lookup'
 - 4: 'slo_options', { localeMatcher: '"slo_matcher"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
