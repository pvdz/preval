# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Binary right > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = () => {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = () => {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = function () {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const SSA_a = function () {};
const tmpCalleeParam = tmpBinBothLhs + SSA_a;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '100() => {}'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: 100
 - 2: '100function() {}'
 - 3: '<function>'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 100
 - 2: '100function() {}'
 - 3: '<function>'
 - eval returned: undefined
