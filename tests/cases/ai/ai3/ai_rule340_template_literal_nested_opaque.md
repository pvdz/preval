# Preval test case

# ai_rule340_template_literal_nested_opaque.md

> Ai > Ai3 > Ai rule340 template literal nested opaque
>
> Test: Template literal with multiple nested opaque expressions and static text.

## Input

`````js filename=intro
// Expected: let r = `Hello ${$('name')}, welcome to ${$('place')}! Count: ${1 + $('num', 1)}.`; $('result', r);
let name = $('name');
let place = $('place');
let count = 1 + $('num', 1);
let result = `Hello ${name}, welcome to ${place}! Count: ${count}.`;
$('final_result', result);
`````


## Settled


`````js filename=intro
const name /*:unknown*/ = $(`name`);
const place /*:unknown*/ = $(`place`);
const tmpBinBothRhs /*:unknown*/ = $(`num`, 1);
const count /*:primitive*/ = 1 + tmpBinBothRhs;
const tmpBinBothRhs$5 /*:string*/ = $coerce(name, `string`);
const tmpBinBothRhs$3 /*:string*/ = $coerce(place, `string`);
const result /*:string*/ /*truthy*/ = `Hello ${tmpBinBothRhs$5}, welcome to ${tmpBinBothRhs$3}! Count: ${count}.`;
$(`final_result`, result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const name = $(`name`);
const place = $(`place`);
const tmpBinBothRhs = $(`num`, 1);
const count = 1 + tmpBinBothRhs;
const tmpBinBothRhs$5 = $coerce(name, `string`);
const tmpBinBothRhs$3 = $coerce(place, `string`);
$(`final_result`, `Hello ${tmpBinBothRhs$5}, welcome to ${tmpBinBothRhs$3}! Count: ${count}.`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "name" );
const b = $( "place" );
const c = $( "num", 1 );
const d = 1 + c;
const e = $coerce( a, "string" );
const f = $coerce( b, "string" );
const g = `Hello ${e}, welcome to ${f}! Count: ${d}.`;
$( "final_result", g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let name = $(`name`);
let place = $(`place`);
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(`num`, 1);
let count = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinBothLhs$5 = `Hello `;
const tmpBinBothRhs$5 = $coerce(name, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
const tmpStringConcatR = $coerce(tmpBinLhs$3, `plustr`);
const tmpBinBothLhs$3 = `${tmpStringConcatR}, welcome to `;
const tmpBinBothRhs$3 = $coerce(place, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpStringConcatR$1 = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs$1 = `${tmpStringConcatR$1}! Count: `;
const tmpBinBothRhs$1 = $coerce(count, `string`);
const tmpBinLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR$3 = $coerce(tmpBinLhs, `plustr`);
let result = `${tmpStringConcatR$3}.`;
$(`final_result`, result);
`````


## Todos triggered


- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'name'
 - 2: 'place'
 - 3: 'num', 1
 - 4: 'final_result', 'Hello name, welcome to place! Count: 1num.'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
