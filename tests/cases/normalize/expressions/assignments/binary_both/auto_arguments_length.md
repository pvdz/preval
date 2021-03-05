# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Binary both > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) + (a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpBinBothLhs = a;
a = arguments;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = arguments;
const SSA_a$1 = arguments;
const tmpCalleeParam = SSA_a + SSA_a$1;
$(tmpCalleeParam);
$(SSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '[object Arguments][object Arguments]'
 - 2: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
