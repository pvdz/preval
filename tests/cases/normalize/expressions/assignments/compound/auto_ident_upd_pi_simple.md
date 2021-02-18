# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > compound > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= ++b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
b = b + 1;
let tmpBinBothRhs = b;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_a = a * 2;
$(SSA_a);
$(SSA_a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
