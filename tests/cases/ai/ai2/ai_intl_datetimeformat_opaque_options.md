# Preval test case

# ai_intl_datetimeformat_opaque_options.md

> Ai > Ai2 > Ai intl datetimeformat opaque options
>
> Test: Intl.DateTimeFormat with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and format method preserved with opaque arguments.
let locale = $('dtf_locale', 'en-US');
let options = $('dtf_options', { year: 'numeric', month: 'long' });
let formatter = new Intl.DateTimeFormat(locale, options);
let date = $('dtf_date_val', new Date(2024, 0, 15));
$('dtf_formatted_date', formatter.format(date));
$('dtf_resolved_options', formatter.resolvedOptions().month);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`dtf_locale`, `en-US`);
const tmpCalleeParam /*:object*/ = { year: `numeric`, month: `long` };
const options /*:unknown*/ = $(`dtf_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.DateTimeFormat;
const formatter /*:object*/ = new tmpNewCallee(locale, options);
const tmpCalleeParam$1 /*:date*/ = new $date_constructor(2024, 0, 15);
const date /*:unknown*/ = $(`dtf_date_val`, tmpCalleeParam$1);
const tmpMCF /*:unknown*/ = formatter.format;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF, formatter, `format`, date);
$(`dtf_formatted_date`, tmpCalleeParam$3);
const tmpMCF$1 /*:unknown*/ = formatter.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
const tmpCalleeParam$5 /*:unknown*/ = tmpCompObj.month;
$(`dtf_resolved_options`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`dtf_locale`, `en-US`);
const options = $(`dtf_options`, { year: `numeric`, month: `long` });
const tmpNewCallee = Intl.DateTimeFormat;
const formatter = new tmpNewCallee(locale, options);
const date = $(`dtf_date_val`, new $date_constructor(2024, 0, 15));
$(`dtf_formatted_date`, formatter.format(date));
$(`dtf_resolved_options`, formatter.resolvedOptions().month);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "dtf_locale", "en-US" );
const b = {
  year: "numeric",
  month: "long",
};
const c = $( "dtf_options", b );
const d = Intl.DateTimeFormat;
const e = new d( a, c );
const f = new $date_constructor( 2024, 0, 15 );
const g = $( "dtf_date_val", f );
const h = e.format;
const i = $dotCall( h, e, "format", g );
$( "dtf_formatted_date", i );
const j = e.resolvedOptions;
const k = $dotCall( j, e, "resolvedOptions" );
const l = k.month;
$( "dtf_resolved_options", l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`dtf_locale`, `en-US`);
let tmpCalleeParam = { year: `numeric`, month: `long` };
let options = $(`dtf_options`, tmpCalleeParam);
const tmpNewCallee = Intl.DateTimeFormat;
let formatter = new tmpNewCallee(locale, options);
let tmpCalleeParam$1 = new $date_constructor(2024, 0, 15);
let date = $(`dtf_date_val`, tmpCalleeParam$1);
const tmpMCF = formatter.format;
let tmpCalleeParam$3 = $dotCall(tmpMCF, formatter, `format`, date);
$(`dtf_formatted_date`, tmpCalleeParam$3);
const tmpMCF$1 = formatter.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
let tmpCalleeParam$5 = tmpCompObj.month;
$(`dtf_resolved_options`, tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'dtf_locale', 'en-US'
 - 2: 'dtf_options', { year: '"numeric"', month: '"long"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
