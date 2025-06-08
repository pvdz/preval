# Preval test case

# ai_intl_collator_opaque_options.md

> Ai > Ai2 > Ai intl collator opaque options
>
> Test: Intl.Collator with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and compare method preserved with opaque arguments.
let locale = $('coll_locale', 'es-ES');
let options = $('coll_options', { sensitivity: 'base' });
let collator = new Intl.Collator(locale, options);
let str1 = $('coll_str1', 'casa');
let str2 = $('coll_str2', 'CASA');
$('coll_comparison_result', collator.compare(str1, str2));
$('coll_resolved_options_sens', collator.resolvedOptions().sensitivity);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`coll_locale`, `es-ES`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { sensitivity: `base` };
const options /*:unknown*/ = $(`coll_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.Collator;
const collator /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const str1 /*:unknown*/ = $(`coll_str1`, `casa`);
const str2 /*:unknown*/ = $(`coll_str2`, `CASA`);
const tmpMCF /*:unknown*/ = collator.compare;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, collator, `compare`, str1, str2);
$(`coll_comparison_result`, tmpCalleeParam$1);
const tmpMCF$1 /*:unknown*/ = collator.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, collator, `resolvedOptions`);
const tmpCalleeParam$3 /*:unknown*/ = tmpCompObj.sensitivity;
$(`coll_resolved_options_sens`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`coll_locale`, `es-ES`);
const options = $(`coll_options`, { sensitivity: `base` });
const tmpNewCallee = Intl.Collator;
const collator = new tmpNewCallee(locale, options);
const str1 = $(`coll_str1`, `casa`);
const str2 = $(`coll_str2`, `CASA`);
$(`coll_comparison_result`, collator.compare(str1, str2));
$(`coll_resolved_options_sens`, collator.resolvedOptions().sensitivity);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "coll_locale", "es-ES" );
const b = { sensitivity: "base" };
const c = $( "coll_options", b );
const d = Intl.Collator;
const e = new d( a, c );
const f = $( "coll_str1", "casa" );
const g = $( "coll_str2", "CASA" );
const h = e.compare;
const i = $dotCall( h, e, "compare", f, g );
$( "coll_comparison_result", i );
const j = e.resolvedOptions;
const k = $dotCall( j, e, "resolvedOptions" );
const l = k.sensitivity;
$( "coll_resolved_options_sens", l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`coll_locale`, `es-ES`);
let tmpCalleeParam = { sensitivity: `base` };
let options = $(`coll_options`, tmpCalleeParam);
const tmpNewCallee = Intl.Collator;
let collator = new tmpNewCallee(locale, options);
let str1 = $(`coll_str1`, `casa`);
let str2 = $(`coll_str2`, `CASA`);
const tmpMCF = collator.compare;
let tmpCalleeParam$1 = $dotCall(tmpMCF, collator, `compare`, str1, str2);
$(`coll_comparison_result`, tmpCalleeParam$1);
const tmpMCF$1 = collator.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, collator, `resolvedOptions`);
let tmpCalleeParam$3 = tmpCompObj.sensitivity;
$(`coll_resolved_options_sens`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'coll_locale', 'es-ES'
 - 2: 'coll_options', { sensitivity: '"base"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
