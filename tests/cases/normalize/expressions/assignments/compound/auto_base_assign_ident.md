# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Compound > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= b = $(2)));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a *= b = $(2)));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
b = $(2);
let tmpBinBothRhs = b;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = $(2);
const a = { a: 999, b: 1000 };
const tmpClusterSSA_a = a * b;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
const c = b * a;
$( c );
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: NaN
 - 3: NaN, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
