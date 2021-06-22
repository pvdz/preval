# Preval test case

# ident_arrow2.md

> Normalize > Expressions > Statement > Template > Ident arrow2
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Options

Test output serialization false negative

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${function() {
  if (x) y;
}}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  `before  ` +
    String(function () {
      debugger;
      if (x) y;
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
  if (x) {
    y;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = function () {
  debugger;
  if (x) {
    y;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

BAD@! Found 2 implicit global bindings:

x, y

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
