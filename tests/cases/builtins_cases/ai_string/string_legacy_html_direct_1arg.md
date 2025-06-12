# Preval test case

# string_legacy_html_direct_1arg.md

> Builtins cases > Ai string > String legacy html direct 1arg
>
> Test all legacy HTML String methods called directly with 1 argument; extra arguments are ignored where not used

## Input

`````js filename=intro
const str = $("hello world");
$(str.anchor("extra")); // Expected: '<a name="hello world">hello world</a>'
$(str.big("extra")); // Expected: '<big>hello world</big>'
$(str.blink("extra")); // Expected: '<blink>hello world</blink>'
$(str.bold("extra")); // Expected: '<b>hello world</b>'
$(str.fixed("extra")); // Expected: '<tt>hello world</tt>'
$(str.fontcolor("red")); // Expected: '<font color="red">hello world</font>'
$(str.fontsize(7)); // Expected: '<font size="7">hello world</font>'
$(str.italics("extra")); // Expected: '<i>hello world</i>'
$(str.link("https://example.com")); // Expected: '<a href="https://example.com">hello world</a>'
$(str.small("extra")); // Expected: '<small>hello world</small>'
$(str.strike("extra")); // Expected: '<strike>hello world</strike>'
$(str.sub("extra")); // Expected: '<sub>hello world</sub>'
$(str.sup("extra")); // Expected: '<sup>hello world</sup>'
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.anchor;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `anchor`, `extra`);
$(tmpCalleeParam);
const tmpMCF$1 /*:unknown*/ = str.big;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, str, `big`, `extra`);
$(tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = str.blink;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, str, `blink`, `extra`);
$(tmpCalleeParam$3);
const tmpMCF$5 /*:unknown*/ = str.bold;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, str, `bold`, `extra`);
$(tmpCalleeParam$5);
const tmpMCF$7 /*:unknown*/ = str.fixed;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$7, str, `fixed`, `extra`);
$(tmpCalleeParam$7);
const tmpMCF$9 /*:unknown*/ = str.fontcolor;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$9, str, `fontcolor`, `red`);
$(tmpCalleeParam$9);
const tmpMCF$11 /*:unknown*/ = str.fontsize;
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$11, str, `fontsize`, 7);
$(tmpCalleeParam$11);
const tmpMCF$13 /*:unknown*/ = str.italics;
const tmpCalleeParam$13 /*:unknown*/ = $dotCall(tmpMCF$13, str, `italics`, `extra`);
$(tmpCalleeParam$13);
const tmpMCF$15 /*:unknown*/ = str.link;
const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF$15, str, `link`, `https://example.com`);
$(tmpCalleeParam$15);
const tmpMCF$17 /*:unknown*/ = str.small;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$17, str, `small`, `extra`);
$(tmpCalleeParam$17);
const tmpMCF$19 /*:unknown*/ = str.strike;
const tmpCalleeParam$19 /*:unknown*/ = $dotCall(tmpMCF$19, str, `strike`, `extra`);
$(tmpCalleeParam$19);
const tmpMCF$21 /*:unknown*/ = str.sub;
const tmpCalleeParam$21 /*:unknown*/ = $dotCall(tmpMCF$21, str, `sub`, `extra`);
$(tmpCalleeParam$21);
const tmpMCF$23 /*:unknown*/ = str.sup;
const tmpCalleeParam$23 /*:unknown*/ = $dotCall(tmpMCF$23, str, `sup`, `extra`);
$(tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.anchor(`extra`));
$(str.big(`extra`));
$(str.blink(`extra`));
$(str.bold(`extra`));
$(str.fixed(`extra`));
$(str.fontcolor(`red`));
$(str.fontsize(7));
$(str.italics(`extra`));
$(str.link(`https://example.com`));
$(str.small(`extra`));
$(str.strike(`extra`));
$(str.sub(`extra`));
$(str.sup(`extra`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.anchor;
const c = $dotCall( b, a, "anchor", "extra" );
$( c );
const d = a.big;
const e = $dotCall( d, a, "big", "extra" );
$( e );
const f = a.blink;
const g = $dotCall( f, a, "blink", "extra" );
$( g );
const h = a.bold;
const i = $dotCall( h, a, "bold", "extra" );
$( i );
const j = a.fixed;
const k = $dotCall( j, a, "fixed", "extra" );
$( k );
const l = a.fontcolor;
const m = $dotCall( l, a, "fontcolor", "red" );
$( m );
const n = a.fontsize;
const o = $dotCall( n, a, "fontsize", 7 );
$( o );
const p = a.italics;
const q = $dotCall( p, a, "italics", "extra" );
$( q );
const r = a.link;
const s = $dotCall( r, a, "link", "https://example.com" );
$( s );
const t = a.small;
const u = $dotCall( t, a, "small", "extra" );
$( u );
const v = a.strike;
const w = $dotCall( v, a, "strike", "extra" );
$( w );
const x = a.sub;
const y = $dotCall( x, a, "sub", "extra" );
$( y );
const z = a.sup;
const ba = $dotCall( z, a, "sup", "extra" );
$( ba );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.anchor;
let tmpCalleeParam = $dotCall(tmpMCF, str, `anchor`, `extra`);
$(tmpCalleeParam);
const tmpMCF$1 = str.big;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, str, `big`, `extra`);
$(tmpCalleeParam$1);
const tmpMCF$3 = str.blink;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, str, `blink`, `extra`);
$(tmpCalleeParam$3);
const tmpMCF$5 = str.bold;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, str, `bold`, `extra`);
$(tmpCalleeParam$5);
const tmpMCF$7 = str.fixed;
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, str, `fixed`, `extra`);
$(tmpCalleeParam$7);
const tmpMCF$9 = str.fontcolor;
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, str, `fontcolor`, `red`);
$(tmpCalleeParam$9);
const tmpMCF$11 = str.fontsize;
let tmpCalleeParam$11 = $dotCall(tmpMCF$11, str, `fontsize`, 7);
$(tmpCalleeParam$11);
const tmpMCF$13 = str.italics;
let tmpCalleeParam$13 = $dotCall(tmpMCF$13, str, `italics`, `extra`);
$(tmpCalleeParam$13);
const tmpMCF$15 = str.link;
let tmpCalleeParam$15 = $dotCall(tmpMCF$15, str, `link`, `https://example.com`);
$(tmpCalleeParam$15);
const tmpMCF$17 = str.small;
let tmpCalleeParam$17 = $dotCall(tmpMCF$17, str, `small`, `extra`);
$(tmpCalleeParam$17);
const tmpMCF$19 = str.strike;
let tmpCalleeParam$19 = $dotCall(tmpMCF$19, str, `strike`, `extra`);
$(tmpCalleeParam$19);
const tmpMCF$21 = str.sub;
let tmpCalleeParam$21 = $dotCall(tmpMCF$21, str, `sub`, `extra`);
$(tmpCalleeParam$21);
const tmpMCF$23 = str.sup;
let tmpCalleeParam$23 = $dotCall(tmpMCF$23, str, `sup`, `extra`);
$(tmpCalleeParam$23);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<a name="extra">hello world</a>'
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
