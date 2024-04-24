# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallComplexCallee = $($);
a = tmpCallComplexCallee(1);
let tmpBinBothLhs = a;
const tmpCallComplexCallee$1 = $($);
a = tmpCallComplexCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCallComplexCallee = $($);
let a = tmpCallComplexCallee(1);
const tmpBinBothLhs = a;
const tmpCallComplexCallee$1 = $($);
a = tmpCallComplexCallee$1(1);
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
let b = a( 1 );
const c = b;
const d = $( $ );
b = d( 1 );
const e = c + b;
$( e );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
