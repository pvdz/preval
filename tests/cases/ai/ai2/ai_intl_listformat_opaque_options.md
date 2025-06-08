# Preval test case

# ai_intl_listformat_opaque_options.md

> Ai > Ai2 > Ai intl listformat opaque options
>
> Test: Intl.ListFormat with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and format method preserved.
let locale = $('lf_locale', 'en-GB');
let options = $('lf_options', { style: 'long', type: 'conjunction' });
let formatter = new Intl.ListFormat(locale, options);
let list = $('lf_list', ['apples', 'bananas', $('lf_opaque_item', 'oranges')]);
$('lf_formatted_list', formatter.format(list));
$('lf_resolved_options_style', formatter.resolvedOptions().style);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`lf_locale`, `en-GB`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { style: `long`, type: `conjunction` };
const options /*:unknown*/ = $(`lf_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.ListFormat;
const formatter /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const tmpArrElement$3 /*:unknown*/ = $(`lf_opaque_item`, `oranges`);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`apples`, `bananas`, tmpArrElement$3];
const list /*:unknown*/ = $(`lf_list`, tmpCalleeParam$1);
const tmpMCF /*:unknown*/ = formatter.format;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF, formatter, `format`, list);
$(`lf_formatted_list`, tmpCalleeParam$3);
const tmpMCF$1 /*:unknown*/ = formatter.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
const tmpCalleeParam$5 /*:unknown*/ = tmpCompObj.style;
$(`lf_resolved_options_style`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`lf_locale`, `en-GB`);
const options = $(`lf_options`, { style: `long`, type: `conjunction` });
const tmpNewCallee = Intl.ListFormat;
const formatter = new tmpNewCallee(locale, options);
const tmpArrElement$3 = $(`lf_opaque_item`, `oranges`);
const list = $(`lf_list`, [`apples`, `bananas`, tmpArrElement$3]);
$(`lf_formatted_list`, formatter.format(list));
$(`lf_resolved_options_style`, formatter.resolvedOptions().style);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "lf_locale", "en-GB" );
const b = {
  style: "long",
  type: "conjunction",
};
const c = $( "lf_options", b );
const d = Intl.ListFormat;
const e = new d( a, c );
const f = $( "lf_opaque_item", "oranges" );
const g = [ "apples", "bananas", f ];
const h = $( "lf_list", g );
const i = e.format;
const j = $dotCall( i, e, "format", h );
$( "lf_formatted_list", j );
const k = e.resolvedOptions;
const l = $dotCall( k, e, "resolvedOptions" );
const m = l.style;
$( "lf_resolved_options_style", m );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`lf_locale`, `en-GB`);
let tmpCalleeParam = { style: `long`, type: `conjunction` };
let options = $(`lf_options`, tmpCalleeParam);
const tmpNewCallee = Intl.ListFormat;
let formatter = new tmpNewCallee(locale, options);
const tmpArrElement = `apples`;
const tmpArrElement$1 = `bananas`;
const tmpArrElement$3 = $(`lf_opaque_item`, `oranges`);
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let list = $(`lf_list`, tmpCalleeParam$1);
const tmpMCF = formatter.format;
let tmpCalleeParam$3 = $dotCall(tmpMCF, formatter, `format`, list);
$(`lf_formatted_list`, tmpCalleeParam$3);
const tmpMCF$1 = formatter.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$1, formatter, `resolvedOptions`);
let tmpCalleeParam$5 = tmpCompObj.style;
$(`lf_resolved_options_style`, tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'lf_locale', 'en-GB'
 - 2: 'lf_options', { style: '"long"', type: '"conjunction"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
