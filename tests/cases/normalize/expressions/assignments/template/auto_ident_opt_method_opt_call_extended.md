# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Template > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(`before  ${(a = b?.c.d.e?.(1))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = b?.c.d.e?.(1)), `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$1 = tmpChainElementObject$3 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
  } else {
  }
} else {
}
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
let tmpBinBothRhs = `undefined`;
let tmpCalleeParam = `before  undefined  after`;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  $(`before  undefined  after`);
} else {
  const tmpObjLitVal$1 = { e: $ };
  const tmpChainElementCall = $dotCall($, tmpObjLitVal$1, 1);
  a = tmpChainElementCall;
  tmpBinBothRhs = $coerce(tmpChainElementCall, `string`);
  tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = "undefined";
let c = "before  undefined  after";
const d = $ == null;
if (d) {
  $( "before  undefined  after" );
}
else {
  const e = { e: $ };
  const f = $dotCall( $, e, 1 );
  a = f;
  b = $coerce( f, "string" );
  c = `before  ${[object Object]}  after`;
  $( c );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before 1 after'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
