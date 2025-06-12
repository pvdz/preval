# Preval test case

# string_legacy_html_direct_3args.md

> Builtins cases > Ai string > String legacy html direct 3args
>
> Test all legacy HTML String methods called directly with 3 arguments; extra arguments are ignored where not used

## Input

`````js filename=intro
const str = $("hello world");
$(str.anchor("extra1", "extra2", "extra3"));
$(str.big("extra1", "extra2", "extra3"));
$(str.blink("extra1", "extra2", "extra3"));
$(str.bold("extra1", "extra2", "extra3"));
$(str.fixed("extra1", "extra2", "extra3"));
$(str.fontcolor("red", "extra2", "extra3"));
$(str.fontsize(7, "extra2", "extra3"));
$(str.italics("extra1", "extra2", "extra3"));
$(str.link("https://example.com", "extra2", "extra3"));
$(str.small("extra1", "extra2", "extra3"));
$(str.strike("extra1", "extra2", "extra3"));
$(str.sub("extra1", "extra2", "extra3"));
$(str.sup("extra1", "extra2", "extra3"));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.anchor;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `anchor`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam);
const tmpMCF$1 /*:unknown*/ = str.big;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, str, `big`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = str.blink;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, str, `blink`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$3);
const tmpMCF$5 /*:unknown*/ = str.bold;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, str, `bold`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$5);
const tmpMCF$7 /*:unknown*/ = str.fixed;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$7, str, `fixed`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$7);
const tmpMCF$9 /*:unknown*/ = str.fontcolor;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$9, str, `fontcolor`, `red`, `extra2`, `extra3`);
$(tmpCalleeParam$9);
const tmpMCF$11 /*:unknown*/ = str.fontsize;
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$11, str, `fontsize`, 7, `extra2`, `extra3`);
$(tmpCalleeParam$11);
const tmpMCF$13 /*:unknown*/ = str.italics;
const tmpCalleeParam$13 /*:unknown*/ = $dotCall(tmpMCF$13, str, `italics`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$13);
const tmpMCF$15 /*:unknown*/ = str.link;
const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF$15, str, `link`, `https://example.com`, `extra2`, `extra3`);
$(tmpCalleeParam$15);
const tmpMCF$17 /*:unknown*/ = str.small;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$17, str, `small`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$17);
const tmpMCF$19 /*:unknown*/ = str.strike;
const tmpCalleeParam$19 /*:unknown*/ = $dotCall(tmpMCF$19, str, `strike`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$19);
const tmpMCF$21 /*:unknown*/ = str.sub;
const tmpCalleeParam$21 /*:unknown*/ = $dotCall(tmpMCF$21, str, `sub`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$21);
const tmpMCF$23 /*:unknown*/ = str.sup;
const tmpCalleeParam$23 /*:unknown*/ = $dotCall(tmpMCF$23, str, `sup`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.anchor(`extra1`, `extra2`, `extra3`));
$(str.big(`extra1`, `extra2`, `extra3`));
$(str.blink(`extra1`, `extra2`, `extra3`));
$(str.bold(`extra1`, `extra2`, `extra3`));
$(str.fixed(`extra1`, `extra2`, `extra3`));
$(str.fontcolor(`red`, `extra2`, `extra3`));
$(str.fontsize(7, `extra2`, `extra3`));
$(str.italics(`extra1`, `extra2`, `extra3`));
$(str.link(`https://example.com`, `extra2`, `extra3`));
$(str.small(`extra1`, `extra2`, `extra3`));
$(str.strike(`extra1`, `extra2`, `extra3`));
$(str.sub(`extra1`, `extra2`, `extra3`));
$(str.sup(`extra1`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.anchor;
const c = $dotCall( b, a, "anchor", "extra1", "extra2", "extra3" );
$( c );
const d = a.big;
const e = $dotCall( d, a, "big", "extra1", "extra2", "extra3" );
$( e );
const f = a.blink;
const g = $dotCall( f, a, "blink", "extra1", "extra2", "extra3" );
$( g );
const h = a.bold;
const i = $dotCall( h, a, "bold", "extra1", "extra2", "extra3" );
$( i );
const j = a.fixed;
const k = $dotCall( j, a, "fixed", "extra1", "extra2", "extra3" );
$( k );
const l = a.fontcolor;
const m = $dotCall( l, a, "fontcolor", "red", "extra2", "extra3" );
$( m );
const n = a.fontsize;
const o = $dotCall( n, a, "fontsize", 7, "extra2", "extra3" );
$( o );
const p = a.italics;
const q = $dotCall( p, a, "italics", "extra1", "extra2", "extra3" );
$( q );
const r = a.link;
const s = $dotCall( r, a, "link", "https://example.com", "extra2", "extra3" );
$( s );
const t = a.small;
const u = $dotCall( t, a, "small", "extra1", "extra2", "extra3" );
$( u );
const v = a.strike;
const w = $dotCall( v, a, "strike", "extra1", "extra2", "extra3" );
$( w );
const x = a.sub;
const y = $dotCall( x, a, "sub", "extra1", "extra2", "extra3" );
$( y );
const z = a.sup;
const ba = $dotCall( z, a, "sup", "extra1", "extra2", "extra3" );
$( ba );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.anchor;
let tmpCalleeParam = $dotCall(tmpMCF, str, `anchor`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam);
const tmpMCF$1 = str.big;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, str, `big`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$1);
const tmpMCF$3 = str.blink;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, str, `blink`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$3);
const tmpMCF$5 = str.bold;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, str, `bold`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$5);
const tmpMCF$7 = str.fixed;
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, str, `fixed`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$7);
const tmpMCF$9 = str.fontcolor;
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, str, `fontcolor`, `red`, `extra2`, `extra3`);
$(tmpCalleeParam$9);
const tmpMCF$11 = str.fontsize;
let tmpCalleeParam$11 = $dotCall(tmpMCF$11, str, `fontsize`, 7, `extra2`, `extra3`);
$(tmpCalleeParam$11);
const tmpMCF$13 = str.italics;
let tmpCalleeParam$13 = $dotCall(tmpMCF$13, str, `italics`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$13);
const tmpMCF$15 = str.link;
let tmpCalleeParam$15 = $dotCall(tmpMCF$15, str, `link`, `https://example.com`, `extra2`, `extra3`);
$(tmpCalleeParam$15);
const tmpMCF$17 = str.small;
let tmpCalleeParam$17 = $dotCall(tmpMCF$17, str, `small`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$17);
const tmpMCF$19 = str.strike;
let tmpCalleeParam$19 = $dotCall(tmpMCF$19, str, `strike`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$19);
const tmpMCF$21 = str.sub;
let tmpCalleeParam$21 = $dotCall(tmpMCF$21, str, `sub`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$21);
const tmpMCF$23 = str.sup;
let tmpCalleeParam$23 = $dotCall(tmpMCF$23, str, `sup`, `extra1`, `extra2`, `extra3`);
$(tmpCalleeParam$23);
`````


## Todos triggered


None


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
