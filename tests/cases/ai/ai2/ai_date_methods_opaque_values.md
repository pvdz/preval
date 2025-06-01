# Preval test case

# ai_date_methods_opaque_values.md

> Ai > Ai2 > Ai date methods opaque values
>
> Test: Date object methods (now, parse, UTC, instance methods) with opaque values where applicable.

## Input

`````js filename=intro
// Expected: Calls preserved. Date.now() should resolve to a static number if Preval evaluates it.
// Avoid new Date() directly for snapshot stability, use fixed values or opaque ones.

// $('date_now_static', Date.now()); // Preval might make this static

let date_str_to_parse = $('date_parse_str', '2024-07-15T10:00:00.000Z');
$('date_parsed_val', Date.parse(date_str_to_parse));

$('date_utc_val', Date.UTC($('date_utc_y', 2024), $('date_utc_m', 6), $('date_utc_d', 15)));

// Instance methods on an opaquely created date
// Create a date from a static timestamp for some predictability if needed for instance methods
let static_timestamp = 1689415200000; // July 15, 2023 10:00:00 AM UTC
let date_inst = new Date($('date_inst_source', static_timestamp));
$('date_inst_getFullYear', date_inst.getFullYear());
$('date_inst_getMonth', date_inst.getMonth()); // 0-indexed
$('date_inst_toString', date_inst.toString().includes('2023')); // toString can be locale-dependent, check substring

let opaque_date_set_val = $('date_set_val', 10);
date_inst.setDate(opaque_date_set_val);
$('date_inst_getDate_after_set', date_inst.getDate());
`````


## Settled


`````js filename=intro
const date_str_to_parse /*:unknown*/ = $(`date_parse_str`, `2024-07-15T10:00:00.000Z`);
const tmpCalleeParam /*:number*/ = $Date_parse(date_str_to_parse);
$(`date_parsed_val`, tmpCalleeParam);
const tmpMCP /*:unknown*/ = $(`date_utc_y`, 2024);
const tmpMCP$1 /*:unknown*/ = $(`date_utc_m`, 6);
const tmpMCP$3 /*:unknown*/ = $(`date_utc_d`, 15);
const tmpCalleeParam$1 /*:number*/ = $Date_UTC(tmpMCP, tmpMCP$1, tmpMCP$3);
$(`date_utc_val`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $(`date_inst_source`, 1689415200000);
const date_inst /*:date*/ = new $date_constructor(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = $dotCall($date_getFullYear, date_inst, `getFullYear`);
$(`date_inst_getFullYear`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:number*/ = $dotCall($date_getMonth, date_inst, `getMonth`);
$(`date_inst_getMonth`, tmpCalleeParam$7);
const tmpMCOO /*:string*/ = $dotCall($date_toString, date_inst, `toString`);
const tmpCalleeParam$9 /*:boolean*/ = $dotCall($string_includes, tmpMCOO, `includes`, `2023`);
$(`date_inst_toString`, tmpCalleeParam$9);
const opaque_date_set_val /*:unknown*/ = $(`date_set_val`, 10);
$dotCall($date_setDate, date_inst, `setDate`, opaque_date_set_val);
const tmpCalleeParam$11 /*:number*/ = $dotCall($date_getDate, date_inst, `getDate`);
$(`date_inst_getDate_after_set`, tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`date_parsed_val`, $Date_parse($(`date_parse_str`, `2024-07-15T10:00:00.000Z`)));
const tmpMCP = $(`date_utc_y`, 2024);
const tmpMCP$1 = $(`date_utc_m`, 6);
$(`date_utc_val`, $Date_UTC(tmpMCP, tmpMCP$1, $(`date_utc_d`, 15)));
const tmpCalleeParam$3 = $(`date_inst_source`, 1689415200000);
const date_inst = new $date_constructor(tmpCalleeParam$3);
$(`date_inst_getFullYear`, $dotCall($date_getFullYear, date_inst, `getFullYear`));
$(`date_inst_getMonth`, $dotCall($date_getMonth, date_inst, `getMonth`));
$(`date_inst_toString`, $dotCall($string_includes, $dotCall($date_toString, date_inst, `toString`), `includes`, `2023`));
$dotCall($date_setDate, date_inst, `setDate`, $(`date_set_val`, 10));
$(`date_inst_getDate_after_set`, $dotCall($date_getDate, date_inst, `getDate`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "date_parse_str", "2024-07-15T10:00:00.000Z" );
const b = $Date_parse( a );
$( "date_parsed_val", b );
const c = $( "date_utc_y", 2024 );
const d = $( "date_utc_m", 6 );
const e = $( "date_utc_d", 15 );
const f = $Date_UTC( c, d, e );
$( "date_utc_val", f );
const g = $( "date_inst_source", 1689415200000 );
const h = new $date_constructor( g );
const i = $dotCall( $date_getFullYear, h, "getFullYear" );
$( "date_inst_getFullYear", i );
const j = $dotCall( $date_getMonth, h, "getMonth" );
$( "date_inst_getMonth", j );
const k = $dotCall( $date_toString, h, "toString" );
const l = $dotCall( $string_includes, k, "includes", "2023" );
$( "date_inst_toString", l );
const m = $( "date_set_val", 10 );
$dotCall( $date_setDate, h, "setDate", m );
const n = $dotCall( $date_getDate, h, "getDate" );
$( "date_inst_getDate_after_set", n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let date_str_to_parse = $(`date_parse_str`, `2024-07-15T10:00:00.000Z`);
const tmpMCF = $Date_parse;
let tmpCalleeParam = $Date_parse(date_str_to_parse);
$(`date_parsed_val`, tmpCalleeParam);
const tmpMCF$1 = $Date_UTC;
const tmpMCP = $(`date_utc_y`, 2024);
const tmpMCP$1 = $(`date_utc_m`, 6);
const tmpMCP$3 = $(`date_utc_d`, 15);
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, $date_constructor, `UTC`, tmpMCP, tmpMCP$1, tmpMCP$3);
$(`date_utc_val`, tmpCalleeParam$1);
let static_timestamp = 1689415200000;
const tmpNewCallee = Date;
let tmpCalleeParam$3 = $(`date_inst_source`, static_timestamp);
let date_inst = new tmpNewCallee(tmpCalleeParam$3);
const tmpMCF$3 = date_inst.getFullYear;
let tmpCalleeParam$5 = $dotCall(tmpMCF$3, date_inst, `getFullYear`);
$(`date_inst_getFullYear`, tmpCalleeParam$5);
const tmpMCF$5 = date_inst.getMonth;
let tmpCalleeParam$7 = $dotCall(tmpMCF$5, date_inst, `getMonth`);
$(`date_inst_getMonth`, tmpCalleeParam$7);
const tmpMCF$7 = date_inst.toString;
const tmpMCOO = $dotCall(tmpMCF$7, date_inst, `toString`);
const tmpMCF$9 = tmpMCOO.includes;
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, tmpMCOO, `includes`, `2023`);
$(`date_inst_toString`, tmpCalleeParam$9);
let opaque_date_set_val = $(`date_set_val`, 10);
const tmpMCF$11 = date_inst.setDate;
$dotCall(tmpMCF$11, date_inst, `setDate`, opaque_date_set_val);
const tmpMCF$13 = date_inst.getDate;
let tmpCalleeParam$11 = $dotCall(tmpMCF$13, date_inst, `getDate`);
$(`date_inst_getDate_after_set`, tmpCalleeParam$11);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $date_getDate
- (todo) access object property that also exists on prototype? $date_getFullYear
- (todo) access object property that also exists on prototype? $date_getMonth
- (todo) access object property that also exists on prototype? $date_setDate
- (todo) access object property that also exists on prototype? $date_toString
- (todo) access object property that also exists on prototype? $object_toString
- (todo) type trackeed tricks can possibly support static $Date_UTC
- (todo) type trackeed tricks can possibly support static $Date_parse
- (todo) type trackeed tricks can possibly support static $date_getDate
- (todo) type trackeed tricks can possibly support static $date_getFullYear
- (todo) type trackeed tricks can possibly support static $date_getMonth
- (todo) type trackeed tricks can possibly support static $date_setDate
- (todo) type trackeed tricks can possibly support static $date_toString


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'date_parse_str', '2024-07-15T10:00:00.000Z'
 - 2: 'date_parsed_val', NaN
 - 3: 'date_utc_y', 2024
 - 4: 'date_utc_m', 6
 - 5: 'date_utc_d', 15
 - 6: 'date_utc_val', NaN
 - 7: 'date_inst_source', 1689415200000
 - 8: 'date_inst_getFullYear', NaN
 - 9: 'date_inst_getMonth', NaN
 - 10: 'date_inst_toString', false
 - 11: 'date_set_val', 10
 - 12: 'date_inst_getDate_after_set', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
