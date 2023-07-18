# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) + $(100));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = ++b) + $(100));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = 2 + tmpBinBothRhs;
$(tmpCalleeParam);
$(2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = 2 + a;
$( b );
$( 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 102
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
