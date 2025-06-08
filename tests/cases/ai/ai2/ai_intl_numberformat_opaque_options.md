# Preval test case

# ai_intl_numberformat_opaque_options.md

> Ai > Ai2 > Ai intl numberformat opaque options
>
> Test: Intl.NumberFormat with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and format method preserved with opaque arguments.
let locale = $('nf_locale', 'de-DE');
let options = $('nf_options', { style: 'currency', currency: $('nf_currency', 'EUR') });
let formatter = new Intl.NumberFormat(locale, options);
let number = $('nf_number_val', 123456.789);
$('nf_formatted_number', formatter.format(number));
$('nf_resolved_options_style', formatter.resolvedOptions().style);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`nf_locale`, `de-DE`);
const tmpObjLitVal$1 /*:unknown*/ = $(`nf_currency`, `EUR`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { style: `currency`, currency: tmpObjLitVal$1 };
const options /*:unknown*/ = $(`nf_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.NumberFormat;
const formatter /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const number /*:unknown*/ = $(`nf_number_val`, 123456.789);
const tmpMCF /*:unknown*/ = formatter.format;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, formatter, `format`, number);
$(`nf_formatted_number`, tmpCalleeParam$1);
const tmpMCF$1 /*:unknown*/ = formatter.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
const tmpCalleeParam$3 /*:unknown*/ = tmpCompObj.style;
$(`nf_resolved_options_style`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`nf_locale`, `de-DE`);
const tmpObjLitVal$1 = $(`nf_currency`, `EUR`);
const options = $(`nf_options`, { style: `currency`, currency: tmpObjLitVal$1 });
const tmpNewCallee = Intl.NumberFormat;
const formatter = new tmpNewCallee(locale, options);
const number = $(`nf_number_val`, 123456.789);
$(`nf_formatted_number`, formatter.format(number));
$(`nf_resolved_options_style`, formatter.resolvedOptions().style);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "nf_locale", "de-DE" );
const b = $( "nf_currency", "EUR" );
const c = {
  style: "currency",
  currency: b,
};
const d = $( "nf_options", c );
const e = Intl.NumberFormat;
const f = new e( a, d );
const g = $( "nf_number_val", 123456.789 );
const h = f.format;
const i = $dotCall( h, f, "format", g );
$( "nf_formatted_number", i );
const j = f.resolvedOptions;
const k = $dotCall( j, f, "resolvedOptions" );
const l = k.style;
$( "nf_resolved_options_style", l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`nf_locale`, `de-DE`);
const tmpObjLitVal = `currency`;
const tmpObjLitVal$1 = $(`nf_currency`, `EUR`);
let tmpCalleeParam = { style: tmpObjLitVal, currency: tmpObjLitVal$1 };
let options = $(`nf_options`, tmpCalleeParam);
const tmpNewCallee = Intl.NumberFormat;
let formatter = new tmpNewCallee(locale, options);
let number = $(`nf_number_val`, 123456.789);
const tmpMCF = formatter.format;
let tmpCalleeParam$1 = $dotCall(tmpMCF, formatter, `format`, number);
$(`nf_formatted_number`, tmpCalleeParam$1);
const tmpMCF$1 = formatter.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
let tmpCalleeParam$3 = tmpCompObj.style;
$(`nf_resolved_options_style`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'nf_locale', 'de-DE'
 - 2: 'nf_currency', 'EUR'
 - 3: 'nf_options', { style: '"currency"', currency: '"nf_currency"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
