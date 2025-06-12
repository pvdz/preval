# Preval test case

# string_legacy_html_direct_0args.md

> Builtins cases > Ai string > String legacy html direct 0args
>
> Test all legacy HTML String methods called directly with 0 arguments; should wrap string in appropriate HTML tags

## Input

`````js filename=intro
const str = $("hello world");
$(str.anchor()); // Expected: '<a name="hello world">hello world</a>'
$(str.big()); // Expected: '<big>hello world</big>'
$(str.blink()); // Expected: '<blink>hello world</blink>'
$(str.bold()); // Expected: '<b>hello world</b>'
$(str.fixed()); // Expected: '<tt>hello world</tt>'
$(str.fontcolor("red")); // Expected: '<font color="red">hello world</font>'
$(str.fontsize(7)); // Expected: '<font size="7">hello world</font>'
$(str.italics()); // Expected: '<i>hello world</i>'
$(str.link("https://example.com")); // Expected: '<a href="https://example.com">hello world</a>'
$(str.small()); // Expected: '<small>hello world</small>'
$(str.strike()); // Expected: '<strike>hello world</strike>'
$(str.sub()); // Expected: '<sub>hello world</sub>'
$(str.sup()); // Expected: '<sup>hello world</sup>'
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.anchor;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, str, `anchor`);
$(tmpCalleeParam);
const tmpMCF$1 /*:unknown*/ = str.big;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, str, `big`);
$(tmpCalleeParam$1);
const tmpMCF$3 /*:unknown*/ = str.blink;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, str, `blink`);
$(tmpCalleeParam$3);
const tmpMCF$5 /*:unknown*/ = str.bold;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, str, `bold`);
$(tmpCalleeParam$5);
const tmpMCF$7 /*:unknown*/ = str.fixed;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$7, str, `fixed`);
$(tmpCalleeParam$7);
const tmpMCF$9 /*:unknown*/ = str.fontcolor;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$9, str, `fontcolor`, `red`);
$(tmpCalleeParam$9);
const tmpMCF$11 /*:unknown*/ = str.fontsize;
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$11, str, `fontsize`, 7);
$(tmpCalleeParam$11);
const tmpMCF$13 /*:unknown*/ = str.italics;
const tmpCalleeParam$13 /*:unknown*/ = $dotCall(tmpMCF$13, str, `italics`);
$(tmpCalleeParam$13);
const tmpMCF$15 /*:unknown*/ = str.link;
const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF$15, str, `link`, `https://example.com`);
$(tmpCalleeParam$15);
const tmpMCF$17 /*:unknown*/ = str.small;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$17, str, `small`);
$(tmpCalleeParam$17);
const tmpMCF$19 /*:unknown*/ = str.strike;
const tmpCalleeParam$19 /*:unknown*/ = $dotCall(tmpMCF$19, str, `strike`);
$(tmpCalleeParam$19);
const tmpMCF$21 /*:unknown*/ = str.sub;
const tmpCalleeParam$21 /*:unknown*/ = $dotCall(tmpMCF$21, str, `sub`);
$(tmpCalleeParam$21);
const tmpMCF$23 /*:unknown*/ = str.sup;
const tmpCalleeParam$23 /*:unknown*/ = $dotCall(tmpMCF$23, str, `sup`);
$(tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.anchor());
$(str.big());
$(str.blink());
$(str.bold());
$(str.fixed());
$(str.fontcolor(`red`));
$(str.fontsize(7));
$(str.italics());
$(str.link(`https://example.com`));
$(str.small());
$(str.strike());
$(str.sub());
$(str.sup());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.anchor;
const c = $dotCall( b, a, "anchor" );
$( c );
const d = a.big;
const e = $dotCall( d, a, "big" );
$( e );
const f = a.blink;
const g = $dotCall( f, a, "blink" );
$( g );
const h = a.bold;
const i = $dotCall( h, a, "bold" );
$( i );
const j = a.fixed;
const k = $dotCall( j, a, "fixed" );
$( k );
const l = a.fontcolor;
const m = $dotCall( l, a, "fontcolor", "red" );
$( m );
const n = a.fontsize;
const o = $dotCall( n, a, "fontsize", 7 );
$( o );
const p = a.italics;
const q = $dotCall( p, a, "italics" );
$( q );
const r = a.link;
const s = $dotCall( r, a, "link", "https://example.com" );
$( s );
const t = a.small;
const u = $dotCall( t, a, "small" );
$( u );
const v = a.strike;
const w = $dotCall( v, a, "strike" );
$( w );
const x = a.sub;
const y = $dotCall( x, a, "sub" );
$( y );
const z = a.sup;
const ba = $dotCall( z, a, "sup" );
$( ba );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.anchor;
let tmpCalleeParam = $dotCall(tmpMCF, str, `anchor`);
$(tmpCalleeParam);
const tmpMCF$1 = str.big;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, str, `big`);
$(tmpCalleeParam$1);
const tmpMCF$3 = str.blink;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, str, `blink`);
$(tmpCalleeParam$3);
const tmpMCF$5 = str.bold;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, str, `bold`);
$(tmpCalleeParam$5);
const tmpMCF$7 = str.fixed;
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, str, `fixed`);
$(tmpCalleeParam$7);
const tmpMCF$9 = str.fontcolor;
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, str, `fontcolor`, `red`);
$(tmpCalleeParam$9);
const tmpMCF$11 = str.fontsize;
let tmpCalleeParam$11 = $dotCall(tmpMCF$11, str, `fontsize`, 7);
$(tmpCalleeParam$11);
const tmpMCF$13 = str.italics;
let tmpCalleeParam$13 = $dotCall(tmpMCF$13, str, `italics`);
$(tmpCalleeParam$13);
const tmpMCF$15 = str.link;
let tmpCalleeParam$15 = $dotCall(tmpMCF$15, str, `link`, `https://example.com`);
$(tmpCalleeParam$15);
const tmpMCF$17 = str.small;
let tmpCalleeParam$17 = $dotCall(tmpMCF$17, str, `small`);
$(tmpCalleeParam$17);
const tmpMCF$19 = str.strike;
let tmpCalleeParam$19 = $dotCall(tmpMCF$19, str, `strike`);
$(tmpCalleeParam$19);
const tmpMCF$21 = str.sub;
let tmpCalleeParam$21 = $dotCall(tmpMCF$21, str, `sub`);
$(tmpCalleeParam$21);
const tmpMCF$23 = str.sup;
let tmpCalleeParam$23 = $dotCall(tmpMCF$23, str, `sup`);
$(tmpCalleeParam$23);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<a name="undefined">hello world</a>'
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
