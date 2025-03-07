# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Template > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(`before  ${$({ a: 1, b: 2 })}  after`);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:object*/ = { a: 1, b: 2 };
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before  ${$({ a: 1, b: 2 })}  after`);
$(999);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(`before  ` + $coerce($({ a: 1, b: 2 }), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpBinBothLhs = `before  `;
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = $coerce( b, "string" );
const d = `before  ${c}  after`;
$( d );
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 'before [object Object] after'
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
