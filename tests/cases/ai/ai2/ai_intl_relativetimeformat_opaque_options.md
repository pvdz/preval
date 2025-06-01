# Preval test case

# ai_intl_relativetimeformat_opaque_options.md

> Ai > Ai2 > Ai intl relativetimeformat opaque options
>
> Test: Intl.RelativeTimeFormat with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and format method preserved.
let locale = $('rtf_locale', 'fr-FR');
let options = $('rtf_options', { numeric: 'auto' });
let formatter = new Intl.RelativeTimeFormat(locale, options);
let value = $('rtf_value', -1);
let unit = $('rtf_unit', 'day');
$('rtf_formatted_time', formatter.format(value, unit));
$('rtf_resolved_options_numeric', formatter.resolvedOptions().numeric);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`rtf_locale`, `fr-FR`);
const tmpCalleeParam /*:object*/ = { numeric: `auto` };
const options /*:unknown*/ = $(`rtf_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.RelativeTimeFormat;
const formatter /*:object*/ = new tmpNewCallee(locale, options);
const value /*:unknown*/ = $(`rtf_value`, -1);
const unit /*:unknown*/ = $(`rtf_unit`, `day`);
const tmpMCF /*:unknown*/ = formatter.format;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, formatter, `format`, value, unit);
$(`rtf_formatted_time`, tmpCalleeParam$1);
const tmpMCF$1 /*:unknown*/ = formatter.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
const tmpCalleeParam$3 /*:unknown*/ = tmpCompObj.numeric;
$(`rtf_resolved_options_numeric`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`rtf_locale`, `fr-FR`);
const options = $(`rtf_options`, { numeric: `auto` });
const tmpNewCallee = Intl.RelativeTimeFormat;
const formatter = new tmpNewCallee(locale, options);
const value = $(`rtf_value`, -1);
const unit = $(`rtf_unit`, `day`);
$(`rtf_formatted_time`, formatter.format(value, unit));
$(`rtf_resolved_options_numeric`, formatter.resolvedOptions().numeric);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "rtf_locale", "fr-FR" );
const b = { numeric: "auto" };
const c = $( "rtf_options", b );
const d = Intl.RelativeTimeFormat;
const e = new d( a, c );
const f = $( "rtf_value", -1 );
const g = $( "rtf_unit", "day" );
const h = e.format;
const i = $dotCall( h, e, "format", f, g );
$( "rtf_formatted_time", i );
const j = e.resolvedOptions;
const k = $dotCall( j, e, "resolvedOptions" );
const l = k.numeric;
$( "rtf_resolved_options_numeric", l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`rtf_locale`, `fr-FR`);
let tmpCalleeParam = { numeric: `auto` };
let options = $(`rtf_options`, tmpCalleeParam);
const tmpNewCallee = Intl.RelativeTimeFormat;
let formatter = new tmpNewCallee(locale, options);
let value = $(`rtf_value`, -1);
let unit = $(`rtf_unit`, `day`);
const tmpMCF = formatter.format;
let tmpCalleeParam$1 = $dotCall(tmpMCF, formatter, `format`, value, unit);
$(`rtf_formatted_time`, tmpCalleeParam$1);
const tmpMCF$1 = formatter.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
let tmpCalleeParam$3 = tmpCompObj.numeric;
$(`rtf_resolved_options_numeric`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'rtf_locale', 'fr-FR'
 - 2: 'rtf_options', { numeric: '"auto"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
