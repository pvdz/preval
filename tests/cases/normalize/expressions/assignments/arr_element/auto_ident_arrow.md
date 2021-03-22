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
$((a = () => {}) + (a = () => {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {};
let tmpBinBothLhs = a;
a = function () {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
const SSA_a$1 = function () {};
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None
