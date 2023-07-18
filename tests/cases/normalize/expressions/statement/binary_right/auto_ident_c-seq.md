# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Binary right > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(100) + ($(1), $(2), $(x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(100) + ($(1), $(2), $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpBinBothRhs = $(x);
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpBinBothRhs = $(1);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$( 2 );
const b = $( 1 );
a + b;
const c = {
a: 999,
b: 1000
;
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
