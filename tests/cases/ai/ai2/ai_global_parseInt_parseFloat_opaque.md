# Preval test case

# ai_global_parseInt_parseFloat_opaque.md

> Ai > Ai2 > Ai global parseInt parseFloat opaque
>
> Test: Global parseInt() and parseFloat() with opaque string and radix.

## Input

`````js filename=intro
// Expected: Calls are preserved with opaque arguments.
let str1 = $('parse_str1', '101 Dalmatians');
let str2 = $('parse_str2', '3.14 is pi');
let str3 = $('parse_str3'); // completely opaque string
let radix = $('parse_radix', 10); // opaque radix

$('parseInt_str1_def_radix', parseInt(str1));
$('parseInt_str1_op_radix', parseInt(str1, radix));
$('parseFloat_str2', parseFloat(str2));

$('parseInt_str3_op_radix', parseInt(str3, radix));
$('parseFloat_str3', parseFloat(str3));
`````


## Settled


`````js filename=intro
const str1 /*:unknown*/ = $(`parse_str1`, `101 Dalmatians`);
const str2 /*:unknown*/ = $(`parse_str2`, `3.14 is pi`);
const str3 /*:unknown*/ = $(`parse_str3`);
const radix /*:unknown*/ = $(`parse_radix`, 10);
const tmpCalleeParam /*:number*/ = $Number_parseInt(str1);
$(`parseInt_str1_def_radix`, tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = $Number_parseInt(str1, radix);
$(`parseInt_str1_op_radix`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = $Number_parseFloat(str2);
$(`parseFloat_str2`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = $Number_parseInt(str3, radix);
$(`parseInt_str3_op_radix`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:number*/ = $Number_parseFloat(str3);
$(`parseFloat_str3`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str1 = $(`parse_str1`, `101 Dalmatians`);
const str2 = $(`parse_str2`, `3.14 is pi`);
const str3 = $(`parse_str3`);
const radix = $(`parse_radix`, 10);
$(`parseInt_str1_def_radix`, $Number_parseInt(str1));
$(`parseInt_str1_op_radix`, $Number_parseInt(str1, radix));
$(`parseFloat_str2`, $Number_parseFloat(str2));
$(`parseInt_str3_op_radix`, $Number_parseInt(str3, radix));
$(`parseFloat_str3`, $Number_parseFloat(str3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "parse_str1", "101 Dalmatians" );
const b = $( "parse_str2", "3.14 is pi" );
const c = $( "parse_str3" );
const d = $( "parse_radix", 10 );
const e = $Number_parseInt( a );
$( "parseInt_str1_def_radix", e );
const f = $Number_parseInt( a, d );
$( "parseInt_str1_op_radix", f );
const g = $Number_parseFloat( b );
$( "parseFloat_str2", g );
const h = $Number_parseInt( c, d );
$( "parseInt_str3_op_radix", h );
const i = $Number_parseFloat( c );
$( "parseFloat_str3", i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str1 = $(`parse_str1`, `101 Dalmatians`);
let str2 = $(`parse_str2`, `3.14 is pi`);
let str3 = $(`parse_str3`);
let radix = $(`parse_radix`, 10);
let tmpCalleeParam = $Number_parseInt(str1);
$(`parseInt_str1_def_radix`, tmpCalleeParam);
let tmpCalleeParam$1 = $Number_parseInt(str1, radix);
$(`parseInt_str1_op_radix`, tmpCalleeParam$1);
let tmpCalleeParam$3 = $Number_parseFloat(str2);
$(`parseFloat_str2`, tmpCalleeParam$3);
let tmpCalleeParam$5 = $Number_parseInt(str3, radix);
$(`parseInt_str3_op_radix`, tmpCalleeParam$5);
let tmpCalleeParam$7 = $Number_parseFloat(str3);
$(`parseFloat_str3`, tmpCalleeParam$7);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseFloat
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'parse_str1', '101 Dalmatians'
 - 2: 'parse_str2', '3.14 is pi'
 - 3: 'parse_str3'
 - 4: 'parse_radix', 10
 - 5: 'parseInt_str1_def_radix', NaN
 - 6: 'parseInt_str1_op_radix', NaN
 - 7: 'parseFloat_str2', NaN
 - 8: 'parseInt_str3_op_radix', NaN
 - 9: 'parseFloat_str3', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
