# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Binary right > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(100) + ($(1), $(2), x);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(100) + ($(1), $(2), x);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpBinBothRhs = x;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$(2);
tmpBinBothLhs + 0;
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$( 2 );
a + 0;
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
