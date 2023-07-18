# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Binary both > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
new ($($))(1) + new ($($))(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
new ($($))(1) + new ($($))(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = $($);
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = $($);
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
const c = $( $ );
const d = new c( 1 );
b + d;
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
