# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Arr element > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Options

Skipping function serialization problems (test artifact)

- skipEval

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) + (a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = () => {
    debugger;
  }) +
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
a = function () {
  debugger;
  return undefined;
};
let tmpBinBothLhs = a;
a = function () {
  debugger;
  return undefined;
};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
const tmpBinBothLhs = a;
a = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  return undefined;
};
const b = a;
a = function() {
  debugger;
  return undefined;
};
const c = b + a;
$( c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
