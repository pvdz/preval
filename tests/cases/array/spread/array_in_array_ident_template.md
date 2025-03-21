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

## Pre Normal


`````js filename=intro
let a = $(10);
const x = [1, `` + $coerce($(`x`), `string`) + ` ` + $coerce($(`y`), `string`) + ``, 3];
if ($) a = $(20);
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized


`````js filename=intro
let a = $(10);
const tmpArrElement = 1;
const tmpBinBothLhs$1 = ``;
const tmpCalleeParam = $(`x`);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
const tmpCalleeParam$1 = $(`y`);
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement$1 = $coerce(tmpBinLhs, `plustr`);
const x = [tmpArrElement, tmpArrElement$1, 3];
if ($) {
  a = $(20);
} else {
}
const y = [`a`, ...x, `b`];
$(y);
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
