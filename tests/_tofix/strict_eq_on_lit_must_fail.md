# Preval test case

# strict_eq_on_lit_must_fail.md

> Tofix > strict eq on lit must fail
>
> Comparing literals against any other value cannot match

Something like `[] === x` must always be false as the fresh var
can't be aliased and so it can never equal the value of x.

## Options

- globals: x

## Input

`````js filename=intro
$({} === x);
$({} !== x);
$([] === x);
$([] !== x);
$(/x/ === x);
$(/x/ !== x);
`````

## Settled


`````js filename=intro
const tmpBinLhs /*:object*/ = {};
const tmpCalleeParam /*:boolean*/ = tmpBinLhs === x;
$(tmpCalleeParam);
const tmpBinLhs$1 /*:object*/ = {};
const tmpCalleeParam$1 /*:boolean*/ = tmpBinLhs$1 !== x;
$(tmpCalleeParam$1);
x;
$(false);
x;
$(true);
const tmpBinLhs$7 /*:regex*/ = /x/;
const tmpCalleeParam$7 /*:boolean*/ = tmpBinLhs$7 === x;
$(tmpCalleeParam$7);
const tmpBinLhs$9 /*:regex*/ = /x/;
const tmpCalleeParam$9 /*:boolean*/ = tmpBinLhs$9 !== x;
$(tmpCalleeParam$9);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({} === x);
$({} !== x);
x;
$(false);
x;
$(true);
$(/x/ === x);
$(/x/ !== x);
`````

## Pre Normal


`````js filename=intro
$({} === x);
$({} !== x);
$([] === x);
$([] !== x);
$(/x/ === x);
$(/x/ !== x);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = {};
const tmpCalleeParam = tmpBinLhs === x;
$(tmpCalleeParam);
const tmpBinLhs$1 = {};
const tmpCalleeParam$1 = tmpBinLhs$1 !== x;
$(tmpCalleeParam$1);
const tmpBinLhs$3 = [];
const tmpCalleeParam$3 = tmpBinLhs$3 === x;
$(tmpCalleeParam$3);
const tmpBinLhs$5 = [];
const tmpCalleeParam$5 = tmpBinLhs$5 !== x;
$(tmpCalleeParam$5);
const tmpBinLhs$7 = /x/;
const tmpCalleeParam$7 = tmpBinLhs$7 === x;
$(tmpCalleeParam$7);
const tmpBinLhs$9 = /x/;
const tmpCalleeParam$9 = tmpBinLhs$9 !== x;
$(tmpCalleeParam$9);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = a === x;
$( b );
const c = {};
const d = c !== x;
$( d );
x;
$( false );
x;
$( true );
const e = /x/;
const f = e === x;
$( f );
const g = /x/;
const h = g !== x;
$( h );
`````

## Globals

None (except for the 1 globals expected by the test)

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
