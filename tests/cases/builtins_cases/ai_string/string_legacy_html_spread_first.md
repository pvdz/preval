# Preval test case

# string_legacy_html_spread_first.md

> Builtins cases > Ai string > String legacy html spread first
>
> Test all legacy HTML String methods called directly with spread as first argument (3 values, all ignored where not used)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["extra1", "extra2", "extra3"];
$(str.anchor(...args));
$(str.big(...args));
$(str.blink(...args));
$(str.bold(...args));
$(str.fixed(...args));
$(str.fontcolor("red", ...args.slice(1)));
$(str.fontsize(7, ...args.slice(1)));
$(str.italics(...args));
$(str.link("https://example.com", ...args.slice(1)));
$(str.small(...args));
$(str.strike(...args));
$(str.sub(...args));
$(str.sup(...args));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.anchor;
const args /*:array*/ /*truthy*/ = [`extra1`, `extra2`, `extra3`];
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `anchor`, ...args);
$(tmpCalleeParam);
const tmpMCF$1 /*:unknown*/ = str.big;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, str, `big`, ...args);
$(tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = str.blink;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, str, `blink`, ...args);
$(tmpCalleeParam$3);
const tmpMCF$5 /*:unknown*/ = str.bold;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, str, `bold`, ...args);
$(tmpCalleeParam$5);
const tmpMCF$7 /*:unknown*/ = str.fixed;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$7, str, `fixed`, ...args);
$(tmpCalleeParam$7);
const tmpMCF$9 /*:unknown*/ = str.fontcolor;
const tmpMCSP /*:array*/ /*truthy*/ = $dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$9, str, `fontcolor`, `red`, ...tmpMCSP);
$(tmpCalleeParam$9);
const tmpMCF$13 /*:unknown*/ = str.fontsize;
const tmpMCSP$1 /*:array*/ /*truthy*/ = $dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$13, str, `fontsize`, 7, ...tmpMCSP$1);
$(tmpCalleeParam$11);
const tmpMCF$17 /*:unknown*/ = str.italics;
const tmpCalleeParam$13 /*:unknown*/ = $dotCall(tmpMCF$17, str, `italics`, ...args);
$(tmpCalleeParam$13);
const tmpMCF$19 /*:unknown*/ = str.link;
const tmpMCSP$3 /*:array*/ /*truthy*/ = $dotCall($array_slice, args, `slice`, 1);
const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF$19, str, `link`, `https://example.com`, ...tmpMCSP$3);
$(tmpCalleeParam$15);
const tmpMCF$23 /*:unknown*/ = str.small;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$23, str, `small`, ...args);
$(tmpCalleeParam$17);
const tmpMCF$25 /*:unknown*/ = str.strike;
const tmpCalleeParam$19 /*:unknown*/ = $dotCall(tmpMCF$25, str, `strike`, ...args);
$(tmpCalleeParam$19);
const tmpMCF$27 /*:unknown*/ = str.sub;
const tmpCalleeParam$21 /*:unknown*/ = $dotCall(tmpMCF$27, str, `sub`, ...args);
$(tmpCalleeParam$21);
const tmpMCF$29 /*:unknown*/ = str.sup;
const tmpCalleeParam$23 /*:unknown*/ = $dotCall(tmpMCF$29, str, `sup`, ...args);
$(tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.anchor;
const args = [`extra1`, `extra2`, `extra3`];
$($dotCall(tmpMCF, str, `anchor`, ...args));
$(str.big(...args));
$(str.blink(...args));
$(str.bold(...args));
$(str.fixed(...args));
const tmpMCF$9 = str.fontcolor;
const tmpMCSP = $dotCall($array_slice, args, `slice`, 1);
$($dotCall(tmpMCF$9, str, `fontcolor`, `red`, ...tmpMCSP));
const tmpMCF$13 = str.fontsize;
const tmpMCSP$1 = $dotCall($array_slice, args, `slice`, 1);
$($dotCall(tmpMCF$13, str, `fontsize`, 7, ...tmpMCSP$1));
$(str.italics(...args));
const tmpMCF$19 = str.link;
const tmpMCSP$3 = $dotCall($array_slice, args, `slice`, 1);
$($dotCall(tmpMCF$19, str, `link`, `https://example.com`, ...tmpMCSP$3));
$(str.small(...args));
$(str.strike(...args));
$(str.sub(...args));
$(str.sup(...args));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.anchor;
const c = [ "extra1", "extra2", "extra3" ];
const d = $dotCall( b, a, "anchor", ...c );
$( d );
const e = a.big;
const f = $dotCall( e, a, "big", ...c );
$( f );
const g = a.blink;
const h = $dotCall( g, a, "blink", ...c );
$( h );
const i = a.bold;
const j = $dotCall( i, a, "bold", ...c );
$( j );
const k = a.fixed;
const l = $dotCall( k, a, "fixed", ...c );
$( l );
const m = a.fontcolor;
const n = $dotCall( $array_slice, c, "slice", 1 );
const o = $dotCall( m, a, "fontcolor", "red", ...n );
$( o );
const p = a.fontsize;
const q = $dotCall( $array_slice, c, "slice", 1 );
const r = $dotCall( p, a, "fontsize", 7, ...q );
$( r );
const s = a.italics;
const t = $dotCall( s, a, "italics", ...c );
$( t );
const u = a.link;
const v = $dotCall( $array_slice, c, "slice", 1 );
const w = $dotCall( u, a, "link", "https://example.com", ...v );
$( w );
const x = a.small;
const y = $dotCall( x, a, "small", ...c );
$( y );
const z = a.strike;
const ba = $dotCall( z, a, "strike", ...c );
$( ba );
const bb = a.sub;
const bc = $dotCall( bb, a, "sub", ...c );
$( bc );
const bd = a.sup;
const be = $dotCall( bd, a, "sup", ...c );
$( be );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`extra1`, `extra2`, `extra3`];
const tmpMCF = str.anchor;
let tmpCalleeParam = $dotCall(tmpMCF, str, `anchor`, ...args);
$(tmpCalleeParam);
const tmpMCF$1 = str.big;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, str, `big`, ...args);
$(tmpCalleeParam$1);
const tmpMCF$3 = str.blink;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, str, `blink`, ...args);
$(tmpCalleeParam$3);
const tmpMCF$5 = str.bold;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, str, `bold`, ...args);
$(tmpCalleeParam$5);
const tmpMCF$7 = str.fixed;
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, str, `fixed`, ...args);
$(tmpCalleeParam$7);
const tmpMCF$9 = str.fontcolor;
const tmpMCF$11 = args.slice;
const tmpMCSP = $dotCall(tmpMCF$11, args, `slice`, 1);
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, str, `fontcolor`, `red`, ...tmpMCSP);
$(tmpCalleeParam$9);
const tmpMCF$13 = str.fontsize;
const tmpMCF$15 = args.slice;
const tmpMCSP$1 = $dotCall(tmpMCF$15, args, `slice`, 1);
let tmpCalleeParam$11 = $dotCall(tmpMCF$13, str, `fontsize`, 7, ...tmpMCSP$1);
$(tmpCalleeParam$11);
const tmpMCF$17 = str.italics;
let tmpCalleeParam$13 = $dotCall(tmpMCF$17, str, `italics`, ...args);
$(tmpCalleeParam$13);
const tmpMCF$19 = str.link;
const tmpMCF$21 = args.slice;
const tmpMCSP$3 = $dotCall(tmpMCF$21, args, `slice`, 1);
let tmpCalleeParam$15 = $dotCall(tmpMCF$19, str, `link`, `https://example.com`, ...tmpMCSP$3);
$(tmpCalleeParam$15);
const tmpMCF$23 = str.small;
let tmpCalleeParam$17 = $dotCall(tmpMCF$23, str, `small`, ...args);
$(tmpCalleeParam$17);
const tmpMCF$25 = str.strike;
let tmpCalleeParam$19 = $dotCall(tmpMCF$25, str, `strike`, ...args);
$(tmpCalleeParam$19);
const tmpMCF$27 = str.sub;
let tmpCalleeParam$21 = $dotCall(tmpMCF$27, str, `sub`, ...args);
$(tmpCalleeParam$21);
const tmpMCF$29 = str.sup;
let tmpCalleeParam$23 = $dotCall(tmpMCF$29, str, `sup`, ...args);
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
