# Preval test case

# constr.md

> Builtins cases > Array > Constr
>
>

## Options

- globals: x, y, z

## Input

`````js filename=intro
$(new Array());
$(new Array(x));
$(new Array(x, y, z));

$(Array());
$(Array(x));
$(Array(x, y, z));

$([]);
$([x]);
$([x,y,z]);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = $array_constructor();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ = $array_constructor(x);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:array*/ = $array_constructor(x, y, z);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:array*/ = $array_constructor();
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:array*/ = $array_constructor(x);
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:array*/ = $array_constructor(x, y, z);
$(tmpCalleeParam$9);
const tmpCalleeParam$11 /*:array*/ = [];
$(tmpCalleeParam$11);
const tmpCalleeParam$13 /*:array*/ = [x];
$(tmpCalleeParam$13);
const tmpCalleeParam$15 /*:array*/ = [x, y, z];
$(tmpCalleeParam$15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($array_constructor());
$($array_constructor(x));
$($array_constructor(x, y, z));
$($array_constructor());
$($array_constructor(x));
$($array_constructor(x, y, z));
$([]);
$([x]);
$([x, y, z]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $array_constructor();
$( a );
const b = $array_constructor( x );
$( b );
const c = $array_constructor( x, y, z );
$( c );
const d = $array_constructor();
$( d );
const e = $array_constructor( x );
$( e );
const f = $array_constructor( x, y, z );
$( f );
const g = [];
$( g );
const h = [ x ];
$( h );
const i = [ x, y, z ];
$( i );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_constructor


## Globals


BAD@! Found 2 implicit global bindings:

x, y


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
