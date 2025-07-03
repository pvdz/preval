# Preval test case

# template_literal_coercion.md

> Math > Ai > Template literal coercion
>
> Template literal coercion with number

## Input

`````js filename=intro
const a = $(0.1 + 0.2);
const s = `${a}`;
$(s);
// Should be "0.30000000000000004"

// Number.toFixed and Number.toPrecision edge cases
const b = $(123.456);
const c = b.toFixed(2);
const d = b.toPrecision(4);
const e = (1.005).toFixed(2);
$(c);
$(d);
$(e);
// Should be "123.46", "123.5", "1.01"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0.30000000000000004);
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
$(tmpBinBothRhs);
const b /*:unknown*/ = $(123.456);
const tmpMCF /*:unknown*/ = b.toFixed;
const c /*:unknown*/ = $dotCall(tmpMCF, b, `toFixed`, 2);
const tmpMCF$1 /*:unknown*/ = b.toPrecision;
const d /*:unknown*/ = $dotCall(tmpMCF$1, b, `toPrecision`, 4);
$(c);
$(d);
$(`1.00`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(String($(0.30000000000000004)));
const b = $(123.456);
const c = b.toFixed(2);
const d = b.toPrecision(4);
$(c);
$(d);
$(`1.00`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.30000000000000004 );
const b = $coerce( a, "string" );
$( b );
const c = $( 123.456 );
const d = c.toFixed;
const e = $dotCall( d, c, "toFixed", 2 );
const f = c.toPrecision;
const g = $dotCall( f, c, "toPrecision", 4 );
$( e );
$( g );
$( "1.00" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 0.30000000000000004;
const a = $(tmpCalleeParam);
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const s = $coerce(tmpBinLhs, `plustr`);
$(s);
const b = $(123.456);
const tmpMCF = b.toFixed;
const c = $dotCall(tmpMCF, b, `toFixed`, 2);
const tmpMCF$1 = b.toPrecision;
const d = $dotCall(tmpMCF$1, b, `toPrecision`, 4);
const tmpMCF$3 = $number_toFixed;
const e = `1.00`;
$(c);
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.30000000000000004
 - 2: '0.30000000000000004'
 - 3: 123.456
 - 4: '123.46'
 - 5: '123.5'
 - 6: '1.00'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
