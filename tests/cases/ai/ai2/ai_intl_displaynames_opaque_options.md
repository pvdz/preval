# Preval test case

# ai_intl_displaynames_opaque_options.md

> Ai > Ai2 > Ai intl displaynames opaque options
>
> Test: Intl.DisplayNames with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and of method preserved.
let locale = $('dn_locale', 'zh-CN');
let options = $('dn_options', { type: 'region' });
let displayNames = new Intl.DisplayNames(locale, options);
let code = $('dn_code_to_display', 'US');
$('dn_display_name_of_code', displayNames.of(code));
$('dn_resolved_options_type', displayNames.resolvedOptions().type);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`dn_locale`, `zh-CN`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { type: `region` };
const options /*:unknown*/ = $(`dn_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.DisplayNames;
const displayNames /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const code /*:unknown*/ = $(`dn_code_to_display`, `US`);
const tmpMCF /*:unknown*/ = displayNames.of;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, displayNames, `of`, code);
$(`dn_display_name_of_code`, tmpCalleeParam$1);
const tmpMCF$1 /*:unknown*/ = displayNames.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, displayNames, `resolvedOptions`);
const tmpCalleeParam$3 /*:unknown*/ = tmpCompObj.type;
$(`dn_resolved_options_type`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`dn_locale`, `zh-CN`);
const options = $(`dn_options`, { type: `region` });
const tmpNewCallee = Intl.DisplayNames;
const displayNames = new tmpNewCallee(locale, options);
const code = $(`dn_code_to_display`, `US`);
$(`dn_display_name_of_code`, displayNames.of(code));
$(`dn_resolved_options_type`, displayNames.resolvedOptions().type);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "dn_locale", "zh-CN" );
const b = { type: "region" };
const c = $( "dn_options", b );
const d = Intl.DisplayNames;
const e = new d( a, c );
const f = $( "dn_code_to_display", "US" );
const g = e.of;
const h = $dotCall( g, e, "of", f );
$( "dn_display_name_of_code", h );
const i = e.resolvedOptions;
const j = $dotCall( i, e, "resolvedOptions" );
const k = j.type;
$( "dn_resolved_options_type", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`dn_locale`, `zh-CN`);
let tmpCalleeParam = { type: `region` };
let options = $(`dn_options`, tmpCalleeParam);
const tmpNewCallee = Intl.DisplayNames;
let displayNames = new tmpNewCallee(locale, options);
let code = $(`dn_code_to_display`, `US`);
const tmpMCF = displayNames.of;
let tmpCalleeParam$1 = $dotCall(tmpMCF, displayNames, `of`, code);
$(`dn_display_name_of_code`, tmpCalleeParam$1);
const tmpMCF$1 = displayNames.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, displayNames, `resolvedOptions`);
let tmpCalleeParam$3 = tmpCompObj.type;
$(`dn_resolved_options_type`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'dn_locale', 'zh-CN'
 - 2: 'dn_options', { type: '"region"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
