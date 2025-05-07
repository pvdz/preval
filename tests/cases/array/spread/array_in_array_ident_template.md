# Preval test case

# array_in_array_ident_template.md

> Array > Spread > Array in array ident template
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
let a = $(10);
const x = [1, `${$('x')} ${$('y')}`, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
$(10);
const tmpCalleeParam /*:unknown*/ = $(`x`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpCalleeParam$1 /*:unknown*/ = $(`y`);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
if ($) {
  $(20);
} else {
}
const tmpBinLhs /*:string*/ = `${tmpBinBothRhs$1} ${tmpBinBothRhs}`;
const y /*:array*/ = [`a`, 1, tmpBinLhs, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
const tmpBinBothRhs$1 = $coerce($(`x`), `string`);
const tmpBinBothRhs = $coerce($(`y`), `string`);
if ($) {
  $(20);
}
const tmpBinLhs = `${tmpBinBothRhs$1} ${tmpBinBothRhs}`;
$([`a`, 1, tmpBinLhs, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
const a = $( "x" );
const b = $coerce( a, "string" );
const c = $( "y" );
const d = $coerce( c, "string" );
if ($) {
  $( 20 );
}
const e = `${b} ${d}`;
const f = [ "a", 1, e, 3, "b" ];
$( f );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 'x'
 - 3: 'y'
 - 4: 20
 - 5: ['a', 1, 'x y', 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
