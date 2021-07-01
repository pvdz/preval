# Preval test case

# ident_logic_and_simple_complex3.md

> Normalize > Expressions > Assignments > Template > Ident logic and simple complex3
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
$(`before  ` + String((a = 1 && $($(obj)))) + `  after`);
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
const tmpCallCallee$1 = String;
a = 1;
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(obj);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

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
const tmpCalleeParam$3 = $(obj);
const tmpClusterSSA_a = $(tmpCalleeParam$3);
const tmpBinBothRhs = String(tmpClusterSSA_a);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
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
