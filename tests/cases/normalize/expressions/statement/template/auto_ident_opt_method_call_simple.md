# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Template > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$(`before  ${b?.c(1)}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(b?.c(1), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
let tmpCallCallee$1 = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootProp.c(1);
  tmpCallCallee$1 = tmpChainElementCall;
} else {
}
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = b.c(1);
const tmpClusterSSA_tmpBinBothRhs = $coerce(tmpChainElementCall, `string`);
const tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = {
  a: 999,
  b: 1000,
};
const c = a.c( 1 );
const d = $coerce( c, "string" );
const e = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
$( e );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before 1 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
