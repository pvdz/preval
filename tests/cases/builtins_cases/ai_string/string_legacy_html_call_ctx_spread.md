# Preval test case

# string_legacy_html_call_ctx_spread.md

> Builtins cases > Ai string > String legacy html call ctx spread
>
> Test all legacy HTML String methods called with .call and object context, and spread as arguments (3 values, all ignored where not used)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["extra1", "extra2", "extra3"];
$(String.prototype.anchor.call(str, ...args));
$(String.prototype.big.call(str, ...args));
$(String.prototype.blink.call(str, ...args));
$(String.prototype.bold.call(str, ...args));
$(String.prototype.fixed.call(str, ...args));
$(String.prototype.fontcolor.call(str, "red", ...args.slice(1)));
$(String.prototype.fontsize.call(str, 7, ...args.slice(1)));
$(String.prototype.italics.call(str, ...args));
$(String.prototype.link.call(str, "https://example.com", ...args.slice(1)));
$(String.prototype.small.call(str, ...args));
$(String.prototype.strike.call(str, ...args));
$(String.prototype.sub.call(str, ...args));
$(String.prototype.sup.call(str, ...args));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const args /*:array*/ /*truthy*/ = [`extra1`, `extra2`, `extra3`];
const tmpCalleeParam /*:string*/ = $dotCall($string_anchor, str, undefined, ...args);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:string*/ = $dotCall($string_big, str, undefined, ...args);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = $dotCall($string_blink, str, undefined, ...args);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:string*/ = $dotCall($string_bold, str, undefined, ...args);
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:string*/ = $dotCall($string_fixed, str, undefined);
$(tmpCalleeParam$7);
$dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$9 /*:string*/ = $dotCall($string_fontcolor, str, undefined, `red`);
$(tmpCalleeParam$9);
$dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$11 /*:string*/ = $dotCall($string_fontsize, str, undefined, 7);
$(tmpCalleeParam$11);
const tmpCalleeParam$13 /*:string*/ = $dotCall($string_italics, str, undefined);
$(tmpCalleeParam$13);
$dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$15 /*:string*/ = $dotCall($string_link, str, undefined, `https://example.com`);
$(tmpCalleeParam$15);
const tmpCalleeParam$17 /*:string*/ = $dotCall($string_small, str, undefined);
$(tmpCalleeParam$17);
const tmpCalleeParam$19 /*:string*/ = $dotCall($string_strike, str, undefined);
$(tmpCalleeParam$19);
const tmpCalleeParam$21 /*:string*/ = $dotCall($string_sub, str, undefined);
$(tmpCalleeParam$21);
const tmpCalleeParam$23 /*:string*/ = $dotCall($string_sup, str, undefined);
$(tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
const args = [`extra1`, `extra2`, `extra3`];
$($dotCall($string_anchor, str, undefined, ...args));
$($dotCall($string_big, str, undefined, ...args));
$($dotCall($string_blink, str, undefined, ...args));
$($dotCall($string_bold, str, undefined, ...args));
$($dotCall($string_fixed, str, undefined));
$dotCall($array_slice, args, `slice`, 1);
$($dotCall($string_fontcolor, str, undefined, `red`));
$dotCall($array_slice, args, `slice`, 1);
$($dotCall($string_fontsize, str, undefined, 7));
$($dotCall($string_italics, str, undefined));
$dotCall($array_slice, args, `slice`, 1);
$($dotCall($string_link, str, undefined, `https://example.com`));
$($dotCall($string_small, str, undefined));
$($dotCall($string_strike, str, undefined));
$($dotCall($string_sub, str, undefined));
$($dotCall($string_sup, str, undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = [ "extra1", "extra2", "extra3" ];
const c = $dotCall( $string_anchor, a, undefined, ...b );
$( c );
const d = $dotCall( $string_big, a, undefined, ...b );
$( d );
const e = $dotCall( $string_blink, a, undefined, ...b );
$( e );
const f = $dotCall( $string_bold, a, undefined, ...b );
$( f );
const g = $dotCall( $string_fixed, a, undefined );
$( g );
$dotCall( $array_slice, b, "slice", 1 );
const h = $dotCall( $string_fontcolor, a, undefined, "red" );
$( h );
$dotCall( $array_slice, b, "slice", 1 );
const i = $dotCall( $string_fontsize, a, undefined, 7 );
$( i );
const j = $dotCall( $string_italics, a, undefined );
$( j );
$dotCall( $array_slice, b, "slice", 1 );
const k = $dotCall( $string_link, a, undefined, "https://example.com" );
$( k );
const l = $dotCall( $string_small, a, undefined );
$( l );
const m = $dotCall( $string_strike, a, undefined );
$( m );
const n = $dotCall( $string_sub, a, undefined );
$( n );
const o = $dotCall( $string_sup, a, undefined );
$( o );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`extra1`, `extra2`, `extra3`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.anchor;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, str, ...args);
$(tmpCalleeParam);
const tmpCompObj$1 = $String_prototype;
const tmpMCOO$1 = tmpCompObj$1.big;
const tmpMCF$1 = tmpMCOO$1.call;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, str, ...args);
$(tmpCalleeParam$1);
const tmpCompObj$3 = $String_prototype;
const tmpMCOO$3 = tmpCompObj$3.blink;
const tmpMCF$3 = tmpMCOO$3.call;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, tmpMCOO$3, `call`, str, ...args);
$(tmpCalleeParam$3);
const tmpCompObj$5 = $String_prototype;
const tmpMCOO$5 = tmpCompObj$5.bold;
const tmpMCF$5 = tmpMCOO$5.call;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, tmpMCOO$5, `call`, str, ...args);
$(tmpCalleeParam$5);
const tmpCompObj$7 = $String_prototype;
const tmpMCOO$7 = tmpCompObj$7.fixed;
const tmpMCF$7 = tmpMCOO$7.call;
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, tmpMCOO$7, `call`, str, ...args);
$(tmpCalleeParam$7);
const tmpCompObj$9 = $String_prototype;
const tmpMCOO$9 = tmpCompObj$9.fontcolor;
const tmpMCF$9 = tmpMCOO$9.call;
const tmpMCF$11 = args.slice;
const tmpMCSP = $dotCall(tmpMCF$11, args, `slice`, 1);
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, tmpMCOO$9, `call`, str, `red`, ...tmpMCSP);
$(tmpCalleeParam$9);
const tmpCompObj$11 = $String_prototype;
const tmpMCOO$11 = tmpCompObj$11.fontsize;
const tmpMCF$13 = tmpMCOO$11.call;
const tmpMCF$15 = args.slice;
const tmpMCSP$1 = $dotCall(tmpMCF$15, args, `slice`, 1);
let tmpCalleeParam$11 = $dotCall(tmpMCF$13, tmpMCOO$11, `call`, str, 7, ...tmpMCSP$1);
$(tmpCalleeParam$11);
const tmpCompObj$13 = $String_prototype;
const tmpMCOO$13 = tmpCompObj$13.italics;
const tmpMCF$17 = tmpMCOO$13.call;
let tmpCalleeParam$13 = $dotCall(tmpMCF$17, tmpMCOO$13, `call`, str, ...args);
$(tmpCalleeParam$13);
const tmpCompObj$15 = $String_prototype;
const tmpMCOO$15 = tmpCompObj$15.link;
const tmpMCF$19 = tmpMCOO$15.call;
const tmpMCF$21 = args.slice;
const tmpMCSP$3 = $dotCall(tmpMCF$21, args, `slice`, 1);
let tmpCalleeParam$15 = $dotCall(tmpMCF$19, tmpMCOO$15, `call`, str, `https://example.com`, ...tmpMCSP$3);
$(tmpCalleeParam$15);
const tmpCompObj$17 = $String_prototype;
const tmpMCOO$17 = tmpCompObj$17.small;
const tmpMCF$23 = tmpMCOO$17.call;
let tmpCalleeParam$17 = $dotCall(tmpMCF$23, tmpMCOO$17, `call`, str, ...args);
$(tmpCalleeParam$17);
const tmpCompObj$19 = $String_prototype;
const tmpMCOO$19 = tmpCompObj$19.strike;
const tmpMCF$25 = tmpMCOO$19.call;
let tmpCalleeParam$19 = $dotCall(tmpMCF$25, tmpMCOO$19, `call`, str, ...args);
$(tmpCalleeParam$19);
const tmpCompObj$21 = $String_prototype;
const tmpMCOO$21 = tmpCompObj$21.sub;
const tmpMCF$27 = tmpMCOO$21.call;
let tmpCalleeParam$21 = $dotCall(tmpMCF$27, tmpMCOO$21, `call`, str, ...args);
$(tmpCalleeParam$21);
const tmpCompObj$23 = $String_prototype;
const tmpMCOO$23 = tmpCompObj$23.sup;
const tmpMCF$29 = tmpMCOO$23.call;
let tmpCalleeParam$23 = $dotCall(tmpMCF$29, tmpMCOO$23, `call`, str, ...args);
$(tmpCalleeParam$23);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_slice
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<a name="extra1">hello world</a>'
 - 3: '<big>hello world</big>'
 - 4: '<blink>hello world</blink>'
 - 5: '<b>hello world</b>'
 - 6: '<tt>hello world</tt>'
 - 7: '<font color="red">hello world</font>'
 - 8: '<font size="7">hello world</font>'
 - 9: '<i>hello world</i>'
 - 10: '<a href="https://example.com">hello world</a>'
 - 11: '<small>hello world</small>'
 - 12: '<strike>hello world</strike>'
 - 13: '<sub>hello world</sub>'
 - 14: '<sup>hello world</sup>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
