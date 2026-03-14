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
const tmpCalleeParam /*:number*/ = $Global_parseInt(str1);
$(`parseInt_str1_def_radix`, tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = $Global_parseInt(str1, radix);
$(`parseInt_str1_op_radix`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = $Global_parseFloat(str2);
$(`parseFloat_str2`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = $Global_parseInt(str3, radix);
$(`parseInt_str3_op_radix`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:number*/ = $Global_parseFloat(str3);
$(`parseFloat_str3`, tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str1 = $(`parse_str1`, `101 Dalmatians`);
const str2 = $(`parse_str2`, `3.14 is pi`);
const str3 = $(`parse_str3`);
const radix = $(`parse_radix`, 10);
$(`parseInt_str1_def_radix`, $Global_parseInt(str1));
$(`parseInt_str1_op_radix`, $Global_parseInt(str1, radix));
$(`parseFloat_str2`, $Global_parseFloat(str2));
$(`parseInt_str3_op_radix`, $Global_parseInt(str3, radix));
$(`parseFloat_str3`, $Global_parseFloat(str3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "parse_str1", "101 Dalmatians" );
const b = $( "parse_str2", "3.14 is pi" );
const c = $( "parse_str3" );
const d = $( "parse_radix", 10 );
const e = $Global_parseInt( a );
$( "parseInt_str1_def_radix", e );
const f = $Global_parseInt( a, d );
$( "parseInt_str1_op_radix", f );
const g = $Global_parseFloat( b );
$( "parseFloat_str2", g );
const h = $Global_parseInt( c, d );
$( "parseInt_str3_op_radix", h );
const i = $Global_parseFloat( c );
$( "parseFloat_str3", i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str1 = $(`parse_str1`, `101 Dalmatians`);
let str2 = $(`parse_str2`, `3.14 is pi`);
let str3 = $(`parse_str3`);
let radix = $(`parse_radix`, 10);
let tmpCalleeParam = $Global_parseInt(str1);
$(`parseInt_str1_def_radix`, tmpCalleeParam);
let tmpCalleeParam$1 = $Global_parseInt(str1, radix);
$(`parseInt_str1_op_radix`, tmpCalleeParam$1);
let tmpCalleeParam$3 = $Global_parseFloat(str2);
$(`parseFloat_str2`, tmpCalleeParam$3);
let tmpCalleeParam$5 = $Global_parseInt(str3, radix);
$(`parseInt_str3_op_radix`, tmpCalleeParam$5);
let tmpCalleeParam$7 = $Global_parseFloat(str3);
$(`parseFloat_str3`, tmpCalleeParam$7);
`````


## Todos triggered


None


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
