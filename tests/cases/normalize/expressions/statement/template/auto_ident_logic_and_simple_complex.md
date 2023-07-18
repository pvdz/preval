# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Template > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${1 && $($(1))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce(1 && $($(1)), `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
let tmpCallCallee$1 = 1;
if (tmpCallCallee$1) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCallCallee$1 = tmpCallCallee$3(tmpCalleeParam$1);
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
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
const tmpClusterSSA_tmpCallCallee$1 = $(tmpCalleeParam$1);
const tmpClusterSSA_tmpBinBothRhs = $coerce(tmpClusterSSA_tmpCallCallee$1, `string`);
const tmpCalleeParam = `before  ${tmpClusterSSA_tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( b );
const d = $coerce( c, "string" );
const e = `before  ${[object Object]}  after`;
$( e );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
