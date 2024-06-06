# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Binary right > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) + (a = new ($($))($(1), $(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(100) + (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpNewCallee = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( $ );
const c = $( 1 );
const d = $( 2 );
const e = new b( c, d );
const f = a + e;
$( f );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: '100[object Object]'
 - 7: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
