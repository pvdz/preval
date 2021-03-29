# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Binary right > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Options

Ignoring function serialization errors

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  $(100) +
    (a = () => {
      debugger;
    }),
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = function () {
  debugger;
};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpSSA_a = function () {
  debugger;
};
const tmpCalleeParam = tmpBinBothLhs + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
