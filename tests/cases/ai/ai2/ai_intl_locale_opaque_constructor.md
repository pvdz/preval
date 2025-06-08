# Preval test case

# ai_intl_locale_opaque_constructor.md

> Ai > Ai2 > Ai intl locale opaque constructor
>
> Test: Intl.Locale constructor with opaque tag and options.

## Input

`````js filename=intro
// Expected: Constructor and properties preserved.
let tag = $('loc_tag', 'ja-JP-u-ca-japanese-co-eor');
let options = $('loc_options', { calendar: $('loc_calendar_opt', 'gregory') });
let locale = new Intl.Locale(tag, options);
$('loc_baseName', locale.baseName);
$('loc_calendar', locale.calendar);
$('loc_hourCycle', locale.hourCycle);
$('loc_toString', locale.toString());
`````


## Settled


`````js filename=intro
const tag /*:unknown*/ = $(`loc_tag`, `ja-JP-u-ca-japanese-co-eor`);
const tmpObjLitVal /*:unknown*/ = $(`loc_calendar_opt`, `gregory`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { calendar: tmpObjLitVal };
const options /*:unknown*/ = $(`loc_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.Locale;
const locale /*:object*/ /*truthy*/ = new tmpNewCallee(tag, options);
const tmpCalleeParam$1 /*:unknown*/ = locale.baseName;
$(`loc_baseName`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = locale.calendar;
$(`loc_calendar`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = locale.hourCycle;
$(`loc_hourCycle`, tmpCalleeParam$5);
const tmpMCF /*:unknown*/ = locale.toString;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF, locale, `toString`);
$(`loc_toString`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tag = $(`loc_tag`, `ja-JP-u-ca-japanese-co-eor`);
const tmpObjLitVal = $(`loc_calendar_opt`, `gregory`);
const options = $(`loc_options`, { calendar: tmpObjLitVal });
const tmpNewCallee = Intl.Locale;
const locale = new tmpNewCallee(tag, options);
$(`loc_baseName`, locale.baseName);
$(`loc_calendar`, locale.calendar);
$(`loc_hourCycle`, locale.hourCycle);
$(`loc_toString`, locale.toString());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "loc_tag", "ja-JP-u-ca-japanese-co-eor" );
const b = $( "loc_calendar_opt", "gregory" );
const c = { calendar: b };
const d = $( "loc_options", c );
const e = Intl.Locale;
const f = new e( a, d );
const g = f.baseName;
$( "loc_baseName", g );
const h = f.calendar;
$( "loc_calendar", h );
const i = f.hourCycle;
$( "loc_hourCycle", i );
const j = f.toString;
const k = $dotCall( j, f, "toString" );
$( "loc_toString", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tag = $(`loc_tag`, `ja-JP-u-ca-japanese-co-eor`);
const tmpObjLitVal = $(`loc_calendar_opt`, `gregory`);
let tmpCalleeParam = { calendar: tmpObjLitVal };
let options = $(`loc_options`, tmpCalleeParam);
const tmpNewCallee = Intl.Locale;
let locale = new tmpNewCallee(tag, options);
let tmpCalleeParam$1 = locale.baseName;
$(`loc_baseName`, tmpCalleeParam$1);
let tmpCalleeParam$3 = locale.calendar;
$(`loc_calendar`, tmpCalleeParam$3);
let tmpCalleeParam$5 = locale.hourCycle;
$(`loc_hourCycle`, tmpCalleeParam$5);
const tmpMCF = locale.toString;
let tmpCalleeParam$7 = $dotCall(tmpMCF, locale, `toString`);
$(`loc_toString`, tmpCalleeParam$7);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_toString


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'loc_tag', 'ja-JP-u-ca-japanese-co-eor'
 - 2: 'loc_calendar_opt', 'gregory'
 - 3: 'loc_options', { calendar: '"loc_calendar_opt"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
