# Preval test case

# classes_call_unknown.md

> Builtins cases > Classes call unknown
>
> Check if builtin toplevel classes are changed into their symbols

## Options

- skipEval=true
- globals: a b c d e f g h i j k l m

## Input

`````js filename=intro
// Note: runtime will throw up immediately over the implicit `a`
$('Boolean:', Boolean(a));
$('Number:', Number(b));
$('String:', String(c));
$('Array:', Array(d));
$('Object:', Object(e));
$('Date:', Date(f));
$('Function:', Function(g));
$('RegExp:', RegExp(h));
$('Map:', Map(i));
$('Set:', Set(j));
$('Buffer:', Buffer(k));
$('Math:', Math(l));
$('JSON:', JSON(m));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:boolean*/ = $boolean_constructor(a);
$(`Boolean:`, tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = $coerce(b, `number`);
$(`Number:`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = $coerce(c, `string`);
$(`String:`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:array*/ = $array_constructor(d);
$(`Array:`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:object*/ = $object_constructor(e);
$(`Object:`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:date*/ = $date_constructor(f);
$(`Date:`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:function*/ = $function_constructor(g);
$(`Function:`, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:regex*/ = $regex_constructor(h);
$(`RegExp:`, tmpCalleeParam$13);
const tmpCalleeParam$15 /*:map*/ = $map_constructor(i);
$(`Map:`, tmpCalleeParam$15);
const tmpCalleeParam$17 /*:set*/ = $set_constructor(j);
$(`Set:`, tmpCalleeParam$17);
const tmpCalleeParam$19 /*:buffer*/ = $buffer_constructor(k);
$(`Buffer:`, tmpCalleeParam$19);
const tmpCalleeParam$21 /*:unknown*/ = Math(l);
$(`Math:`, tmpCalleeParam$21);
const tmpCalleeParam$23 /*:unknown*/ = JSON(m);
$(`JSON:`, tmpCalleeParam$23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Boolean:`, $boolean_constructor(a));
$(`Number:`, $coerce(b, `number`));
$(`String:`, $coerce(c, `string`));
$(`Array:`, $array_constructor(d));
$(`Object:`, $object_constructor(e));
$(`Date:`, $date_constructor(f));
$(`Function:`, $function_constructor(g));
$(`RegExp:`, $regex_constructor(h));
$(`Map:`, $map_constructor(i));
$(`Set:`, $set_constructor(j));
$(`Buffer:`, $buffer_constructor(k));
$(`Math:`, Math(l));
$(`JSON:`, JSON(m));
`````


## PST Settled
With rename=true

`````js filename=intro
const n = $boolean_constructor( a );
$( "Boolean:", n );
const o = $coerce( b, "number" );
$( "Number:", o );
const p = $coerce( c, "string" );
$( "String:", p );
const q = $array_constructor( d );
$( "Array:", q );
const r = $object_constructor( e );
$( "Object:", r );
const s = $date_constructor( f );
$( "Date:", s );
const t = $function_constructor( g );
$( "Function:", t );
const u = $regex_constructor( h );
$( "RegExp:", u );
const v = $map_constructor( i );
$( "Map:", v );
const w = $set_constructor( j );
$( "Set:", w );
const x = $buffer_constructor( k );
$( "Buffer:", x );
const y = Math( l );
$( "Math:", y );
const z = JSON( m );
$( "JSON:", z );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $boolean_constructor(a);
$(`Boolean:`, tmpCalleeParam);
const tmpNumberFirstArg = b;
let tmpCalleeParam$1 = $coerce(b, `number`);
$(`Number:`, tmpCalleeParam$1);
const tmpStringFirstArg = c;
let tmpCalleeParam$3 = $coerce(c, `string`);
$(`String:`, tmpCalleeParam$3);
let tmpCalleeParam$5 = $array_constructor(d);
$(`Array:`, tmpCalleeParam$5);
let tmpCalleeParam$7 = $object_constructor(e);
$(`Object:`, tmpCalleeParam$7);
let tmpCalleeParam$9 = $date_constructor(f);
$(`Date:`, tmpCalleeParam$9);
let tmpCalleeParam$11 = $function_constructor(g);
$(`Function:`, tmpCalleeParam$11);
let tmpCalleeParam$13 = $regex_constructor(h);
$(`RegExp:`, tmpCalleeParam$13);
let tmpCalleeParam$15 = $map_constructor(i);
$(`Map:`, tmpCalleeParam$15);
let tmpCalleeParam$17 = $set_constructor(j);
$(`Set:`, tmpCalleeParam$17);
let tmpCalleeParam$19 = $buffer_constructor(k);
$(`Buffer:`, tmpCalleeParam$19);
let tmpCalleeParam$21 = Math(l);
$(`Math:`, tmpCalleeParam$21);
let tmpCalleeParam$23 = JSON(m);
$(`JSON:`, tmpCalleeParam$23);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $array_constructor
- (todo) type trackeed tricks can possibly support static $boolean_constructor
- (todo) type trackeed tricks can possibly support static $buffer_constructor
- (todo) type trackeed tricks can possibly support static $date_constructor
- (todo) type trackeed tricks can possibly support static $map_constructor
- (todo) type trackeed tricks can possibly support static $object_constructor
- (todo) type trackeed tricks can possibly support static $set_constructor


## Globals


None (except for the 13 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
