# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = b?.c(1))}  after`);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
const tmpClusterSSA_tmpBinBothRhs /*:string*/ = $coerce(tmpChainElementCall, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpChainElementCall);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = { c: $ }.c(1);
$(`before  ${tmpChainElementCall}  after`);
$(tmpChainElementCall);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = b?.c(1)), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = `before  `;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.c(1);
  a = tmpChainElementCall;
} else {
}
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
const a = { c: $ };
const b = a.c( 1 );
const c = $coerce( b, "string" );
const d = `before  ${c}  after`;
$( d );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'before 1 after'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
