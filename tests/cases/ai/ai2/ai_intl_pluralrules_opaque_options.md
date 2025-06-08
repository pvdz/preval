# Preval test case

# ai_intl_pluralrules_opaque_options.md

> Ai > Ai2 > Ai intl pluralrules opaque options
>
> Test: Intl.PluralRules with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and select method preserved with opaque arguments.
let locale = $('pr_locale', 'ar-EG');
let options = $('pr_options', { type: 'ordinal' });
let rules = new Intl.PluralRules(locale, options);
let number = $('pr_number_val', 3);
$('pr_selected_rule', rules.select(number));
$('pr_resolved_options_type', rules.resolvedOptions().type);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`pr_locale`, `ar-EG`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { type: `ordinal` };
const options /*:unknown*/ = $(`pr_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.PluralRules;
const rules /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const number /*:unknown*/ = $(`pr_number_val`, 3);
const tmpMCF /*:unknown*/ = rules.select;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, rules, `select`, number);
$(`pr_selected_rule`, tmpCalleeParam$1);
const tmpMCF$1 /*:unknown*/ = rules.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, rules, `resolvedOptions`);
const tmpCalleeParam$3 /*:unknown*/ = tmpCompObj.type;
$(`pr_resolved_options_type`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`pr_locale`, `ar-EG`);
const options = $(`pr_options`, { type: `ordinal` });
const tmpNewCallee = Intl.PluralRules;
const rules = new tmpNewCallee(locale, options);
const number = $(`pr_number_val`, 3);
$(`pr_selected_rule`, rules.select(number));
$(`pr_resolved_options_type`, rules.resolvedOptions().type);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pr_locale", "ar-EG" );
const b = { type: "ordinal" };
const c = $( "pr_options", b );
const d = Intl.PluralRules;
const e = new d( a, c );
const f = $( "pr_number_val", 3 );
const g = e.select;
const h = $dotCall( g, e, "select", f );
$( "pr_selected_rule", h );
const i = e.resolvedOptions;
const j = $dotCall( i, e, "resolvedOptions" );
const k = j.type;
$( "pr_resolved_options_type", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`pr_locale`, `ar-EG`);
let tmpCalleeParam = { type: `ordinal` };
let options = $(`pr_options`, tmpCalleeParam);
const tmpNewCallee = Intl.PluralRules;
let rules = new tmpNewCallee(locale, options);
let number = $(`pr_number_val`, 3);
const tmpMCF = rules.select;
let tmpCalleeParam$1 = $dotCall(tmpMCF, rules, `select`, number);
$(`pr_selected_rule`, tmpCalleeParam$1);
const tmpMCF$1 = rules.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, rules, `resolvedOptions`);
let tmpCalleeParam$3 = tmpCompObj.type;
$(`pr_resolved_options_type`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'pr_locale', 'ar-EG'
 - 2: 'pr_options', { type: '"ordinal"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
