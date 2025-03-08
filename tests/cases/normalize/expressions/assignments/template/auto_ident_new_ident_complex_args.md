# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Template > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = new $($(1), $(2)))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$5 /*:unknown*/ = $(2);
const a /*:object*/ = new $(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
const a = new $(tmpCalleeParam$3, tmpCalleeParam$5);
$(`before  ${a}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = new $($(1), $(2))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
const tmpNewCallee = $;
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
const d = $coerce( c, "string" );
const e = `before  ${d}  after`;
$( e );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 'before [object Object] after'
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
