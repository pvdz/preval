# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Template > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${() => {}}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  `before  ` +
    String(() => {
      debugger;
    }) +
    `  after`,
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before function() {return undefined;} after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
