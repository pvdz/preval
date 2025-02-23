# Preval test case

# ident_logic_and_simple_complex3.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple complex3
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
const obj = {toString(){ $('toString'); return 'x'; }, valueOf(){ $('valueOf'); return 'y'; }};
let a = { a: 999, b: 1000 };
$(`before  ${(a = 1 && $($(obj)))}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
const obj = {
  toString() {
    debugger;
    $(`toString`);
    return `x`;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return `y`;
  },
};
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = 1 && $($(obj))), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
const obj = {
  toString() {
    debugger;
    $(`toString`);
    return `x`;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return `y`;
  },
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = 1;
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(obj);
  a = tmpCallCallee$3(tmpCalleeParam$1);
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
const obj /*:object*/ = {
  toString() {
    debugger;
    $(`toString`);
    return `x`;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return `y`;
  },
};
const tmpCalleeParam$1 /*:unknown*/ = $(obj);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpClusterSSA_a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    $( "toString" );
    return "x";
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return "y";
  },
};
const b = $( a );
const c = $( b );
const d = $coerce( c, "string" );
const e = `before  ${d}  after`;
$( e );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { toString: '"<function>"', valueOf: '"<function>"' }
 - 2: { toString: '"<function>"', valueOf: '"<function>"' }
 - 3: 'toString'
 - 4: 'before x after'
 - 5: { toString: '"<function>"', valueOf: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
