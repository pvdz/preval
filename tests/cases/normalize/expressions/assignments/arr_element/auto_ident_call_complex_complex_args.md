# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) + (a = $($)($(1), $(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) + (a = $($)($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpBinBothLhs = a;
const tmpCallCallee$3 = $($);
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
a = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$7);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCallCallee$3 = $($);
const tmpCalleeParam$5 = $(1);
const tmpCalleeParam$7 = $(2);
const tmpClusterSSA_a = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = a( b, c );
const e = $( $ );
const f = $( 1 );
const g = $( 2 );
const h = e( f, g );
const i = d + h;
$( i );
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
