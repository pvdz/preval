# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Binary left > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) + $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = () => {}) + $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {};
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
const tmpBinBothRhs = $(100);
const tmpCalleeParam = SSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '() => {}100'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: 100
 - 2: 'function() {}100'
 - 3: '<function>'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 100
 - 2: 'function() {}100'
 - 3: '<function>'
 - eval returned: undefined
