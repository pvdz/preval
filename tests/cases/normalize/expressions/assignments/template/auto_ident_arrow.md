# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Template > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Options

Ignoring function serialization errors

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = () => {})}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  `before  ${(a = () => {
    debugger;
  })}  after`,
);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {
  debugger;
};
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = function () {
  debugger;
};
const tmpCalleeParam = `before  ${tmpSSA_a}  after`;
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
