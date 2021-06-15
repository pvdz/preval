# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Template > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = arguments)}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + (a = arguments) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = arguments;
let tmpBinBothRhs = a;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = arguments;
const tmpBinLhs = `before  ` + a;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: 'before [object Arguments] after'
 - 2: { 0: '"<$>"', 1: '"<function>"', 2: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
