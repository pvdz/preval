# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = $(b)) + $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = $(b);
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const SSA_a = $(1);
const tmpBinBothRhs = $(100);
const tmpCalleeParam = SSA_a + tmpBinBothRhs;
$(tmpCalleeParam);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 101
 - 4: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
